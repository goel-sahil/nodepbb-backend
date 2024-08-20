import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThreadPrefixesService } from './thread-prefixes.service';
import { CreateThreadPrefixDto } from './dto/create-thread-prefix.dto';
import { UpdateThreadPrefixDto } from './dto/update-thread-prefix.dto';

@Controller('thread-prefixes')
export class ThreadPrefixesController {
  constructor(private readonly threadPrefixesService: ThreadPrefixesService) {}

  @Post()
  create(@Body() createThreadPrefixDto: CreateThreadPrefixDto) {
    return this.threadPrefixesService.create(createThreadPrefixDto);
  }

  @Get()
  findAll() {
    return this.threadPrefixesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadPrefixesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadPrefixDto: UpdateThreadPrefixDto) {
    return this.threadPrefixesService.update(+id, updateThreadPrefixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadPrefixesService.remove(+id);
  }
}
