import { Controller, Get, Param, Query } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}
  @Get(':id')
  async getThreadById(@Param('id') id: number) {
    const data = await this.threadsService.getThreadById(id);
    return {
      message: 'Thread has been fetched successfully!',
      data: data,
    };
  }

  @Get(':threadId/posts')
  async getPostsByThreadId(
    @Param('threadId') threadId: number,
    @Query('page') page: number,
  ) {
    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const data = await this.threadsService.getPostsByThreadId(threadId, page);
    return {
      message: 'Posts has been fetched successfully!',
      data: data,
    };
  }
}
