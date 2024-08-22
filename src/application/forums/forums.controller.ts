import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { OptionalAuthGuard } from '../../common/auth/optional-auth.guard';

@Controller('forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @UseGuards(OptionalAuthGuard)
  @Get('/')
  async getForums(@Request() req) {
    return req.user;
    return {
      message: 'Fourms has been fetched successfully!',
      data: [],
    };
  }
}
