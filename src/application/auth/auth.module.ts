import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@Module({
  imports: [RegisterModule, LoginModule, ForgotPasswordModule],
  providers: [],
})
export class AuthModule {}
