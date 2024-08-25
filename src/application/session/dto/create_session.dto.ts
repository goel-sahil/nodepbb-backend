import { IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsOptional()
  user_agent: string;

  @IsString()
  @IsOptional()
  route: string;
}
