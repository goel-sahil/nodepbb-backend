import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/common/models/User.model';
import Session from 'src/common/models/Session.model';
import Thread from 'src/common/models/Thread.model';
import Post from 'src/common/models/Post.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Session, Thread, Post])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
