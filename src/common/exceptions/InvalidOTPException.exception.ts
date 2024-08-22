import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOtpException extends HttpException {
  constructor() {
    super(
      {
        message: 'The given data is invalid.',
        errors: {
          otp: ['Invalid OTP'],
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
