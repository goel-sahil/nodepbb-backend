import { Module } from '@nestjs/common';
import { ShoutsService } from './shouts.service';
import { ShoutsController } from './shouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Shout from 'src/common/models/Shout.model';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Shout])],
  controllers: [ShoutsController],
  providers: [ShoutsService],
})
export class ShoutsModule {}
