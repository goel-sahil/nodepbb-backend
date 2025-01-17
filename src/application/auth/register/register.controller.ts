import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserRegisterDto } from './dto/register_user.dto';
import { Request } from 'express';
import { CheckUsernameEmailDto } from './dto/check_username_email.dto';
import { OtpDto } from './dto/otp.dto';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  /**
   * Handles user registration.
   * @param body - The user registration details.
   * @param request - The HTTP request object, used to get the IP address.
   * @returns A success message and the registered user data.
   */
  @Post()
  async registerUser(@Body() body: UserRegisterDto, @Req() request: Request) {
    // Extract IP address from the request headers or socket
    const ip = this.extractClientIp(request);

    // Register the user and return the result
    const user = await this.registerService.registerUser(body, ip);
    return {
      message: 'User has been registered successfully!',
      data: user,
    };
  }

  /**
   * Checks if a username or email is unique.
   * @param field - The field to check (username or email).
   * @param body - The data containing the value to check.
   * @returns A message and the uniqueness status.
   */
  @HttpCode(200)
  @Post('/:field')
  async checkUnique(
    @Param('field') field: string,
    @Body() body: CheckUsernameEmailDto,
  ) {
    // Validate the uniqueness of the provided field value
    const result = await this.registerService.checkUnique(field, body);
    return {
      message: 'Uniqueness check completed!',
      data: result,
    };
  }

  /**
   * Retrieves the status of a user by ID.
   * @param userId - The ID of the user.
   * @returns A message and the user's status.
   */
  @Get('/user-status/:userId')
  async getUserStatus(@Param('userId') userId: number) {
    // Fetch the user status
    const status = await this.registerService.getUserStatus(userId);
    return {
      message: 'User status retrieved successfully!',
      data: status,
    };
  }

  /**
   * Verifies the OTP for a user.
   * @param userId - The ID of the user to verify.
   * @param body - The OTP data.
   * @returns A message and the verified user data.
   */
  @HttpCode(200)
  @Post('/verify-otp/:userId')
  async verifyUserOTP(@Param('userId') userId: number, @Body() body: OtpDto) {
    // Verify the OTP and return the result
    await this.registerService.verifyUserOTP(userId, body);
    return {
      message: 'User has been verified successfully!',
    };
  }

  /**
   * Resend the OTP for a user.
   * @param userId - The ID of the user to verify.
   * @returns A message and the verified user data.
   */
  @HttpCode(200)
  @Post('/resend-otp/:userId')
  async resendUserOTP(@Param('userId') userId: number) {
    await this.registerService.resendUserOTP(userId);
    return {
      message: 'New OTP has been sent to your email!',
    };
  }

  /**
   * Extracts the client's IP address from the request.
   * @param request - The HTTP request object.
   * @returns The client's IP address.
   */
  private extractClientIp(request: Request): string | undefined {
    return (
      request.headers['x-forwarded-for']?.toString().split(',').shift() ||
      request.socket.remoteAddress
    );
  }
}
