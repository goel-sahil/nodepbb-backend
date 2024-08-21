import { Module } from '@nestjs/common';
import { AdmincpModule } from './admincp/admincp.module';
import { ForumsModule } from './forums/forums.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [AdmincpModule, ForumsModule, RegisterModule],
})
export class ApplicationModule {}
