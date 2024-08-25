import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateShoutDto {
  @MaxLength(2000)
  @IsNotEmpty()
  @IsString()
  message: string;
}
