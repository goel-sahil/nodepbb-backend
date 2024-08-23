import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { RequestPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto'; // New DTO for resetting the password

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  // Inject the ForgotPasswordService into the controller
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  /**
   * Handles POST requests to request a password reset link.
   * @param body - The request payload containing the email of the user.
   * @returns A success message if the password reset link has been sent.
   */
  @Post()
  async requestPasswordLink(@Body() body: RequestPasswordDto) {
    // Call the service method to initiate the password reset process
    await this.forgotPasswordService.requestPasswordLink(body);
    return {
      message: 'Password reset link has been sent to your email successfully!',
    };
  }

  /**
   * Handles POST requests to reset the password.
   * @param body - The request payload containing the reset token and new password.
   * @returns A success message if the password has been reset successfully.
   */
  @Post('reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    // Call the service method to reset the password
    await this.forgotPasswordService.resetPassword(body);
    return {
      message: 'Password has been reset successfully!',
    };
  }
}
