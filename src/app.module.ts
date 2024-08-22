import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database.config/database.config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './config/mail.config/mail.config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    HealthModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
