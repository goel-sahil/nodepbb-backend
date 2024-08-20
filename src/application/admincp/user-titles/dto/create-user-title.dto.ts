import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTitleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsInt()
  @IsNotEmpty()
  readonly posts?: number;
}
