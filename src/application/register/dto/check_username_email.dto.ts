import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CheckUsernameEmailDto {
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  value: string;
}
