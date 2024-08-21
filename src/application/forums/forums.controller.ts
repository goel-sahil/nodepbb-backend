import { Controller, Get } from '@nestjs/common';
import { ForumsService } from './forums.service';

@Controller('forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @Get('/')
  async getForums() {
    const data = await this.forumsService.getForums();
    return {
      message: 'Fourms has been fetched successfully!',
      data: data,
    };
  }
}
