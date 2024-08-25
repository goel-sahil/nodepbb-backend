import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(200)
  @Post()
  async login(@Body() body: LoginDto, @Req() request: Request) {
    // Extract IP address from the request headers or socket
    const ip = this.extractClientIp(request);
    const data = await this.loginService.login(body, ip);
    return {
      message: 'You have logged in successfully!',
      data: data,
    };
  }

  /**
   * Extracts the client's IP address from the request.
   * @param request - The HTTP request object.
   * @returns The client's IP address.
   */
  private extractClientIp(request: Request): string | undefined {
    return (
      request.headers['x-forwarded-for']?.toString().split(',').shift() ||
      request.socket.remoteAddress
    );
  }
}
