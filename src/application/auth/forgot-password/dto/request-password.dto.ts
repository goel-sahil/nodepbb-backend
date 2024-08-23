import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RequestPasswordDto {
  @MaxLength(120)
  @IsNotEmpty()
  @IsString()
  username: string;
}
