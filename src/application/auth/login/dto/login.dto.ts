import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
