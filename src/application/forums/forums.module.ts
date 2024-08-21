import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/common/entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [ForumsController],
  providers: [ForumsService],
})
export class ForumsModule {}
