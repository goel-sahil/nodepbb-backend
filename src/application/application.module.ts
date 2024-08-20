import { Module } from '@nestjs/common';
import { AdmincpModule } from './admincp/admincp.module';

@Module({
  imports: [AdmincpModule],
})
export class ApplicationModule {}
