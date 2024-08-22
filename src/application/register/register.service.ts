import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import User from 'src/common/models/User.model';
import Otp from 'src/common/models/Otp.model';
import UserGroup from 'src/common/models/UserGroup.model';
import UserTitle from 'src/common/models/UserTitle.model';
import { OtpService } from 'src/common/services/otp/otp.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisterDto } from './dto/register_user.dto';
import { CheckUsernameEmailDto } from './dto/check_username_email.dto';
import { OtpDto } from './dto/otp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { UserNotFoundException } from 'src/common/exceptions/UserNotFoundException.exception';
import { UserIsActiveException } from 'src/common/exceptions/UserIsActiveException.exception';
import { InvalidOtpException } from 'src/common/exceptions/InvalidOTPException.exception';
@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserGroup) private readonly userGroupModel: typeof UserGroup,
    @InjectModel(UserTitle) private readonly userTitleModel: typeof UserTitle,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
    private sequelize: Sequelize,
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
    const data = {
      ...userDto,
      password: hashedPassword,
      user_group_id: userGroup.id,
      user_title_id: userTitle.id,
      register_ip: userIp,
      last_ip: userIp,
      status: 0,
    };

    // Save user and OTP, and send registration email
    const user = await this.saveUserWithOtp(data, otpCode);
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

    const existingUser = await this.userModel.findOne({
      attributes: ['id', 'email', 'username'],
      where: {
        [Op.or]: [{ username: userDto.username }, { email: userDto.email }],
      },
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

    const [userGroup] = await this.userGroupModel.findOrCreate({
      where: { title: 'Registered' },
      defaults: {
        name_style: 'Registered',
        display_order: 1,
      },
    });

    const [userTitle] = await this.userTitleModel.findOrCreate({
      where: { title: 'Newbie' },
    });

    return [userGroup, userTitle];
  }

  /**
   * Saves the user and OTP in a single transaction.
   * @param userDetails - The user details to save.
   * @param otpCode - The OTP code to save.
   * @returns The saved user.
   */
  private async saveUserWithOtp(userDetails, otpCode: string): Promise<User> {
    this.logger.log('Saving user and OTP in a transaction');
    const user = await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      const user = await this.userModel.create(userDetails, transactionHost);
      await this.otpModel.create(
        {
          user_id: user.id,
          otp: otpCode,
          otpType: 1,
        },
        {
          ...transactionHost,
          returning: true,
        },
      );

      this.logger.log(
        `User and OTP saved successfully with user ID: ${user.id}`,
      );
      return user;
    });
    return user;
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
    const existingUser = await this.userModel.findOne({
      attributes: ['id'],
      where: { [field]: dto.value },
    });

    return { is_unique: !existingUser };
  }

  /**
   * Checks the status of a user by ID.
   * @param userId - The ID of the user.
   * @returns The user's status.
   * @throws BadRequestException if the user does not exist.
   */
  async getUserStatus(userId: number) {
    const user = await this.userModel.findOne({
      attributes: ['status'],
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return { status: user.status };
  }

  /**
   * Verifies the user's OTP and updates their status if valid.
   * @param userId - The ID of the user to verify.
   * @param otpDto - The OTP data.
   * @returns The updated user information.
   * @throws BadRequestException if user or OTP is invalid.
   */
  async verifyUserOTP(userId: number, otpDto: OtpDto) {
    this.logger.log('Verifying user OTP');

    const [user, otp] = await Promise.all([
      this.getUserForVerification(userId),
      this.getOtpForVerification(userId, otpDto.otp),
    ]);

    await this.updateUserStatusAndDeleteOtp(user, otp);
  }

  private async getUserForVerification(userId: number): Promise<User> {
    const user = await this.userModel.findOne({
      attributes: ['id', 'status'],
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.status == 1) {
      throw new UserIsActiveException();
    }

    return user;
  }

  private async getOtpForVerification(
    userId: number,
    otpCode: string,
  ): Promise<Otp> {
    const otp = await this.otpModel.findOne({
      attributes: ['id'],
      where: { user_id: userId, otp: otpCode },
    });

    if (!otp) {
      throw new InvalidOtpException();
    }
    return otp;
  }

  private async updateUserStatusAndDeleteOtp(user: User, otp: Otp) {
    await this.sequelize.transaction(async (t) => {
      user.status = 1;
      await user.save({ transaction: t });
      await otp.destroy({ transaction: t });
    });
  }

  /**
   * Resend the user's OTP.
   * @param userId - The ID of the user.
   * @throws BadRequestException if user or OTP is invalid.
   */
  async resendUserOTP(userId: number) {
    this.logger.log('Resending user OTP');

    const user = await this.userModel.findOne({
      attributes: ['id', 'status', 'email', 'username'],
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.status == 1) {
      throw new UserIsActiveException();
    }

    const otpCode = this.otpService.generateOtp();
    await this.otpModel.upsert(
      {
        user_id: userId,
        otp_type: 1,
        otp: otpCode,
      },
      {
        conflictFields: ['user_id', 'otp_type'],
      },
    );
    await this.sendRegistrationEmail(user.email, user.username, otpCode);
  }
}
