import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
