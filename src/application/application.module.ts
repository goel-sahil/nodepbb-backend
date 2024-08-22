import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ForumsModule } from './forums/forums.module';

@Module({
  imports: [AuthModule, ForumsModule],
})
export class ApplicationModule {}
