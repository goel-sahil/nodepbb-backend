import { Module } from '@nestjs/common';
import { ThreadPrefixesService } from './thread-prefixes.service';
import { ThreadPrefixesController } from './thread-prefixes.controller';

@Module({
  controllers: [ThreadPrefixesController],
  providers: [ThreadPrefixesService],
})
export class ThreadPrefixesModule {}
