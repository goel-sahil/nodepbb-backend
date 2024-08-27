import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Thread from 'src/common/models/Thread.model';
import Post from 'src/common/models/Post.model';

@Module({
  imports: [SequelizeModule.forFeature([Thread, Post])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
