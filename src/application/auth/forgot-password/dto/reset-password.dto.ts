import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @Min(1)
  @IsInt()
  userId: number;

  @MaxLength(6)
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  otp: string;

  @MaxLength(100)
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
