import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  /**
   * Retrieves statistics for active members, users, and posts.
   * @returns An object containing various statistics.
   */
  @Get()
  async getStats() {
    const data = await this.statsService.getStats();
    return {
      message: 'Stats fetched successfully!',
      data: data,
    };
  }

  /**
   * Retrieves list of members.
   * @returns An object containing members.
   */
  @Get('members')
  async getMembers(@Query('page') page: number = 1) {
    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const data = await this.statsService.getMembers(page);
    return {
      message: 'Stats fetched successfully!',
      data: data,
    };
  }
}
