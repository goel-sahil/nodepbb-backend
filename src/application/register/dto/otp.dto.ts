import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class OtpDto {
  @MaxLength(6)
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  otp: string;
}
