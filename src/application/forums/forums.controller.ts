import { Controller, Get, Param, Query } from '@nestjs/common';
import { ForumsService } from './forums.service';

@Controller('forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @Get(':id')
  async getForumByID(@Param('id') id: number) {
    const data = await this.forumsService.getForumByID(id);
    return {
      message: 'Fourm has been fetched successfully!',
      data: data,
    };
  }

  @Get(':forumId/threads')
  async getThreadsByForumId(
    @Param('forumId') forumId: number,
    @Query('page') page: number,
  ) {
    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const data = await this.forumsService.getThreadsByForumId(forumId, page);
    return {
      message: 'Threads has been fetched successfully!',
      data: data,
    };
  }
}
