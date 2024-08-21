import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  generateOtp(length: number = 6): string {
    const otp = crypto
      .randomInt(0, Math.pow(10, length))
      .toString()
      .padStart(length, '0');
    return otp;
  }
}
