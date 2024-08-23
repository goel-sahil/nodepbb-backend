import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/common/models/User.model';
import { RequestPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserNotFoundException } from 'src/common/exceptions/UserNotFoundException.exception';
import Otp from 'src/common/models/Otp.model';
import { InvalidOtpException } from 'src/common/exceptions/InvalidOTPException.exception';
import { AuthService } from 'src/common/auth/auth.service';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpService } from 'src/common/services/otp/otp.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private readonly otpService: OtpService,
  ) {}

  /**
   * Initiates the password reset process by generating an OTP
   * and sending a password reset email to the user.
   * @param body - Contains the username or email of the user requesting a password reset.
   */
  async requestPasswordLink(body: RequestPasswordDto) {
    // Attempt to find the user by username or email
    const user = await this.authService.findUserByUsernameOrEmail(
      body.username,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    // Generate a new OTP code
    const otpCode = this.otpService.generateOtp();

    // Upsert the OTP record (insert or update if it already exists)
    const [otp] = await this.otpModel.upsert(
      {
        user_id: user.id,
        otp_type: 2, // Assuming 2 is the type for password reset
        otp: otpCode,
      },
      {
        conflictFields: ['user_id', 'otp_type'],
      },
    );

    // Send the OTP to the user's email
    await this.sendPasswordResetOTPMail(user.email, otp.otp);
  }

  /**
   * Resets the user's password if the provided OTP is valid.
   * @param body - Contains the user's ID, the OTP, and the new password.
   */
  async resetPassword(body: ResetPasswordDto) {
    // Attempt to find the user by their primary key (ID)
    const user = await this.userModel.findByPk(body.userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    // Validate the OTP provided by the user
    const otp = await this.otpModel.findOne({
      where: {
        otp: body.otp,
        otp_type: 2,
        user_id: user.id,
      },
    });

    if (!otp) {
      throw new InvalidOtpException();
    }

    // Hash the new password and update the user's record
    const hashedPassword = await this.authService.hashPassword(body.password);
    user.password = hashedPassword;
    await user.save();

    // Send a success email to the user
    await this.sendPasswordResetSuccessMail(user.email);
  }

  /**
   * Sends an OTP email to the user for password reset.
   * @param email - The user's email address.
   * @param otp - The OTP code to include in the email.
   */
  private async sendPasswordResetOTPMail(
    email: string,
    otp: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: 'password_reset_otp', // Ensure this template exists
      context: {
        appName: 'NodePBB',
        otp: otp,
      },
    });
  }

  /**
   * Sends an email notification to the user after their password has been successfully reset.
   * @param email - The user's email address.
   */
  private async sendPasswordResetSuccessMail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Successful',
      template: 'password_reset_success', // Ensure this template exists
      context: {
        appName: 'NodePBB',
      },
    });
  }
}
