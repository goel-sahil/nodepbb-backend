import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: LoginDto) {
    const data = await this.loginService.login(body);
    return {
      message: 'You have logged in successfully!',
      data: data,
    };
  }
}
