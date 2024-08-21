import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/common/entities/User.entity';
import { UserGroup } from 'src/common/entities/UserGroup.entity';
import { UserTitle } from 'src/common/entities/UserTitle.entity';
import { Otp } from 'src/common/entities/Otp.entity';
import { OtpService } from 'src/common/services/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisterDto } from './dto/register_user.dto';
import { CheckUsernameEmailDto } from './dto/check_username_email.dto';
import { OtpDto } from './dto/otp.dto';

interface CreateUserDto {
  name: string;
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
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
    @InjectRepository(UserTitle)
    private readonly userTitleRepository: Repository<UserTitle>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Registers a new user and sends an OTP via email.
   * @param userDto - User registration details.
   * @param userIp - The IP address of the user registering.
   * @returns The newly registered user.
   */
  async registerUser(userDto: UserRegisterDto, userIp: string): Promise<User> {
    this.logger.log('Starting user registration process');

    // Ensure the username and email are unique
    await this.ensureUniqueUser(userDto);

    // Hash the user's password
    const hashedPassword = await this.hashPassword(userDto.password);

    // Fetch default user group and title
    const [userGroup, userTitle] = await this.getDefaultGroupAndTitle();

    // Generate OTP
    const otpCode = this.otpService.generateOtp();

    // Save user and OTP, and send registration email
    const user = await this.saveUserWithOtp(
      {
        ...userDto,
        password: hashedPassword,
        user_group_id: userGroup.id,
        user_title_id: userTitle.id,
        regip: userIp,
        lastip: userIp,
        status: 0,
      },
      otpCode,
    );

    await this.sendRegistrationEmail(user.email, user.username, otpCode);

    this.logger.log(`User ${user.username} registered successfully`);
    return user;
  }

  /**
   * Ensures the username and email are unique.
   * @param userDto - User registration details.
   * @throws BadRequestException if username or email is already taken.
   */
  private async ensureUniqueUser(userDto: UserRegisterDto): Promise<void> {
    this.logger.log('Checking for existing user');

    const existingUser = await this.userRepository.findOne({
      select: ['id', 'email', 'username'],
      where: [{ username: userDto.username }, { email: userDto.email }],
    });

    if (existingUser) {
      if (existingUser.email === userDto.email) {
        this.logger.warn(`Email ${userDto.email} is already registered`);
        throw new BadRequestException(
          `Email: ${userDto.email} is already registered`,
        );
      }

      this.logger.warn(`Username ${userDto.username} is already taken`);
      throw new BadRequestException(
        `Username: ${userDto.username} is already taken`,
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
   * Fetches the default user group and title.
   * @returns An array containing the default user group and title.
   * @throws Error if default group or title is not found.
   */
  private async getDefaultGroupAndTitle(): Promise<[UserGroup, UserTitle]> {
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
   * @param otpCode - The OTP code to save.
   * @returns The saved user.
   */
  private async saveUserWithOtp(
    userDetails: CreateUserDto,
    otpCode: string,
  ): Promise<User> {
    this.logger.log('Saving user and OTP in a transaction');

    return await this.userRepository.manager.transaction(
      async (manager: EntityManager) => {
        const user = this.userRepository.create(userDetails);
        const savedUser = await manager.save(user);

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

  /**
   * Checks if a username or email is unique.
   * @param field - The field to check (username or email).
   * @param dto - DTO containing the value to check.
   * @returns Object indicating if the value is unique or not.
   */
  async checkUnique(field: string, dto: CheckUsernameEmailDto) {
    const existingUser = await this.userRepository.findOne({
      where: { [field]: dto.value },
    });

    return { is_unique: !existingUser };
  }

  /**
   * Checks the status of a user by ID.
   * @param userID - The ID of the user.
   * @returns The user's status.
   * @throws BadRequestException if the user does not exist.
   */
  async checkUserStatus(userID: number) {
    const user = await this.userRepository.findOne({
      select: ['status'],
      where: { id: userID },
    });

    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    return { status: user.status };
  }

  /**
   * Verifies the user's OTP and updates their status if valid.
   * @param userID - The ID of the user to verify.
   * @param otpDto - The OTP data.
   * @returns The updated user information.
   * @throws BadRequestException if user or OTP is invalid.
   */
  async verifyUserOTP(userID: number, otpDto: OtpDto) {
    this.logger.log('Verifying user OTP');

    const user = await this.userRepository.findOne({
      select: ['id', 'status'],
      where: { id: userID },
    });

    if (!user) {
      throw new BadRequestException('User does not exist!');
    }

    if (user.status == 1) {
      throw new BadRequestException('User is already active!');
    }

    const otp = await this.otpRepository.findOne({
      select: ['id'],
      where: { user_id: userID, otp: otpDto.otp },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP!');
    }

    await this.userRepository.manager.transaction(
      async (manager: EntityManager) => {
        await manager.getRepository(this.otpRepository.target).delete(otp.id);
        await manager
          .getRepository(this.userRepository.target)
          .update(user.id, { status: 1 });
      },
    );
  }
}
