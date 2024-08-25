import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ForumsModule } from './forums/forums.module';
import { ShoutsModule } from './shouts/shouts.module';
import { StatsModule } from './stats/stats.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [AuthModule, ForumsModule, ShoutsModule, StatsModule, SessionModule],
})
export class ApplicationModule {}
