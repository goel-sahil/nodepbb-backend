import { Injectable } from '@nestjs/common';
import { CreateThreadPrefixDto } from './dto/create-thread-prefix.dto';
import { UpdateThreadPrefixDto } from './dto/update-thread-prefix.dto';

@Injectable()
export class ThreadPrefixesService {
  create(createThreadPrefixDto: CreateThreadPrefixDto) {
    return 'This action adds a new threadPrefix';
  }

  findAll() {
    return `This action returns all threadPrefixes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} threadPrefix`;
  }

  update(id: number, updateThreadPrefixDto: UpdateThreadPrefixDto) {
    return `This action updates a #${id} threadPrefix`;
  }

  remove(id: number) {
    return `This action removes a #${id} threadPrefix`;
  }
}
