import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { OtpService } from 'src/common/services/otp/otp.service';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/common/models/User.model';
import Otp from 'src/common/models/Otp.model';
import UserGroup from 'src/common/models/UserGroup.model';
import UserTitle from 'src/common/models/UserTitle.model';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([User, Otp, UserGroup, UserTitle]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, OtpService],
})
export class RegisterModule {}
