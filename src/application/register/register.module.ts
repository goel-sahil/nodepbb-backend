import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/User.entity';
import { Otp } from 'src/common/entities/Otp.entity';
import { UserGroup } from 'src/common/entities/UserGroup.entity';
import { UserTitle } from 'src/common/entities/UserTitle.entity';
import { OtpService } from 'src/common/services/otp/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp, UserGroup, UserTitle])],
  controllers: [RegisterController],
  providers: [RegisterService, OtpService],
})
export class RegisterModule {}
