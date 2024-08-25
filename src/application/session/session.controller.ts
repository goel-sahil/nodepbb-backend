import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create_session.dto';
import { Request } from 'express';
import { OptionalAuthGuard } from 'src/common/auth/optional-auth.guard';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(OptionalAuthGuard)
  @Post()
  async createOrUpdateSession(@Body() body: CreateSessionDto, @Req() request) {
    // Extract IP address from the request headers or socket
    const ip = this.extractClientIp(request);
    await this.sessionService.createOrUpdateSession(body, ip, request.user);
    return {
      message: 'Session has been created successfully!',
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
