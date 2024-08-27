import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import Forum from 'src/common/models/Fourm.model';
import Thread from 'src/common/models/Thread.model';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Forum, Thread])],
  controllers: [ForumsController],
  providers: [ForumsService],
})
export class ForumsModule {}
