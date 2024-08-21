import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/User.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserRegisterDto } from './dto/register_user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserGroup } from 'src/common/entities/UserGroup.entity';
import { UserTitle } from 'src/common/entities/UserTitle.entity';
import { Otp } from 'src/common/entities/Otp.entity';
import { OtpService } from 'src/common/services/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';

interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  dob: string;
  gender: number;
  user_group_id: number;
  user_title_id: number;
  regip: string;
  lastip: string;
  status: number;
}

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
    @InjectRepository(UserTitle)
    private readonly userTitleRepository: Repository<UserTitle>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Registers a new user and sends an OTP via email.
   * @param body - User registration details.
   * @param userIP - The IP address of the user registering.
   * @returns The newly registered user.
   */
  async registerUser(body: UserRegisterDto, userIP: string): Promise<User> {
    this.logger.log('Starting user registration process');
    // Check if the username or email already exists
    await this.checkExistingUser(body);

    // Hash the password
    const hashedPassword = await this.hashPassword(body.password);

    // Get default user group and title
    const [userGroup, userTitle] = await this.getDefaultUserGroupAndTitle();

    // Generate OTP
    const otpCode = this.otpService.generateOtp();

    // Save the new user and OTP in a transaction
    const user = await this.saveUserAndOtp(
      {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        dob: body.dob,
        gender: body.gender,
        user_group_id: userGroup.id,
        user_title_id: userTitle.id,
        regip: userIP,
        lastip: userIP,
        status: 0,
      },
      otpCode,
    );

    await this.sendRegistrationEmail(user.email, user.username, otpCode);

    this.logger.log(`User ${user.username} registered successfully`);

    return user;
  }

  /**
   * Checks if a user with the given username or email already exists.
   * @param body - User registration details.
   * @throws BadRequestException if the email or username is already taken.
   */
  private async checkExistingUser(body: UserRegisterDto): Promise<void> {
    this.logger.log('Checking for existing user');

    const existingUser = await this.userRepository.findOne({
      where: [{ username: body.username }, { email: body.email }],
    });

    if (existingUser) {
      if (existingUser.email === body.email) {
        this.logger.warn(`Email ${body.email} is already registered`);
        throw new BadRequestException(
          `Email: ${body.email} is already registered`,
        );
      }

      this.logger.warn(`Username ${body.username} is already taken`);
      throw new BadRequestException(
        `Username: ${body.username} is already taken`,
      );
    }
  }

  /**
   * Hashes the user's password using bcrypt.
   * @param password - The plain text password.
   * @returns The hashed password.
   */
  private async hashPassword(password: string): Promise<string> {
    this.logger.log('Hashing password');
    const saltRounds = parseInt(
      this.configService.get<string>('HASH_SALT_ROUNDS'),
      10,
    );
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Fetches the default user group and title from the database.
   * @returns An array containing the default user group and user title.
   * @throws Error if default user group or title is not found.
   */
  private async getDefaultUserGroupAndTitle(): Promise<[UserGroup, UserTitle]> {
    this.logger.log('Fetching default user group and title');

    const userGroup = await this.userGroupRepository.findOne({
      select: ['id'],
      where: { title: 'Registered' },
    });

    const userTitle = await this.userTitleRepository.findOne({
      select: ['id'],
      where: { title: 'Newbie' },
    });

    if (!userGroup || !userTitle) {
      this.logger.error('Default user group or title not found');
      throw new Error('Default user group or title not found');
    }

    return [userGroup, userTitle];
  }

  /**
   * Saves the user and OTP in a single transaction.
   * @param userDetails - The user details to save.
   * @returns The saved user.
   */
  private async saveUserAndOtp(
    userDetails: CreateUserDto,
    otpCode: string,
  ): Promise<User> {
    this.logger.log('Saving user and OTP in a transaction');

    return await this.userRepository.manager.transaction(
      async (manager: EntityManager) => {
        // Create and save user
        const user = this.userRepository.create(userDetails);
        const savedUser = await manager.save(user);

        // Generate and save OTP
        const otp = this.otpRepository.create({
          user_id: savedUser.id,
          otp: otpCode,
        });
        await manager.save(otp);

        this.logger.log(
          `User and OTP saved successfully with user ID: ${savedUser.id}`,
        );

        return savedUser;
      },
    );
  }

  /**
   * Sends a registration confirmation email to the user.
   * @param email - The user's email address.
   * @param username - The user's username.
   * @param otpCode - The OTP code to include in the email.
   */
  private async sendRegistrationEmail(
    email: string,
    username: string,
    otpCode: string,
  ): Promise<void> {
    this.logger.log('Sending registration email');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      template: 'user_register_otp',
      context: {
        appName: 'NodePBB',
        firstName: username,
        otp: otpCode,
      },
    });

    this.logger.log(`Registration email sent to ${email}`);
  }
}
