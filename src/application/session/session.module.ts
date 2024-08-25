import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Session from 'src/common/models/Session.model';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
