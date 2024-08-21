import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(120)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  @ValidateIf((o) => o.confirm_password === o.password)
  confirm_password: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @ValidateIf((o) => o.email === o.confirm_email)
  confirm_email: string;

  @IsInt()
  @Min(0)
  @Max(3)
  gender: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in the format YYYY-MM-DD',
  })
  dob: string;
}
