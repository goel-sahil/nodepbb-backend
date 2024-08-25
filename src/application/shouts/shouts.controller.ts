import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { ShoutsService } from './shouts.service';
import { CreateShoutDto } from './dto/create-shout.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('shouts')
export class ShoutsController {
  constructor(private readonly shoutsService: ShoutsService) {}
  @Get('recent')
  async getRecentShouts() {
    const data = await this.shoutsService.getRecentShouts();
    return {
      message: 'Recent shouts fetched successfully!',
      data: data,
    };
  }

  @Get()
  async getShouts(@Query('page') page: number = 1) {
    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const data = await this.shoutsService.getShouts(page);
    return {
      message: 'Recent shouts fetched successfully!',
      data: data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createShout(@Body() body: CreateShoutDto, @Request() req) {
    const data = await this.shoutsService.createShout(body, req.user);
    return {
      message: 'Shout has been added successfully!',
      data: data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req) {
    await this.shoutsService.deleteShout(id, req.user);
    return {
      message: 'Shout has been deleted successfully!',
    };
  }
}
