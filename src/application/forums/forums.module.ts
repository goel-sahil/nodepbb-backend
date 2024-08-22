import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';
import { ForumsController } from './forums.controller';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ForumsController],
  providers: [ForumsService],
})
export class ForumsModule {}
