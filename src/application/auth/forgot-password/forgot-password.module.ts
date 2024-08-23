import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/common/models/User.model';
import { OtpService } from 'src/common/services/otp/otp.service';
import Otp from 'src/common/models/Otp.model';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([User, Otp])],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, OtpService],
})
export class ForgotPasswordModule {}
