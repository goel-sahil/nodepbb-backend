import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UserRegisterDto {
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  email: string;

  @MaxLength(100)
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Max(3)
  @Min(1, {
    message: 'Please select gender',
  })
  @IsInt()
  gender: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in the format YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsString()
  dob: string;
}
