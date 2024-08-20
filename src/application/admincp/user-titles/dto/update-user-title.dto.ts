import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTitleDto } from './create-user-title.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserTitleDto extends PartialType(CreateUserTitleDto) {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsInt()
  @IsNotEmpty()
  readonly posts?: number;
}
