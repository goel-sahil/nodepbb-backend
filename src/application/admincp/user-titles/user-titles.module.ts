import { Module } from '@nestjs/common';
import { UserTitlesService } from './user-titles.service';
import { UserTitlesController } from './user-titles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTitle } from 'src/common/entities/UserTitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTitle])],
  controllers: [UserTitlesController],
  providers: [UserTitlesService],
})
export class UserTitlesModule {}
