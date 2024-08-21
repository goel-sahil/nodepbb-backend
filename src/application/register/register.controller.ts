import { Body, Controller, Post, Req } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserRegisterDto } from './dto/register_user.dto';
import { Request } from 'express';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() body: UserRegisterDto, @Req() request: Request) {
    const ip =
      request.headers['x-forwarded-for']?.toString().split(',').shift() ||
      request.socket.remoteAddress;

    const data = await this.registerService.registerUser(body, ip);
    return {
      message: 'User has been registered successfully!',
      data: data,
    };
  }
}
