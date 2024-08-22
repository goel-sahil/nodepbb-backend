import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseConfigService } from './config/database.config/database.config.service';
import { MailConfigService } from './config/mail.config/mail.config.service';
import { HealthModule } from './health/health.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    HealthModule,
    ApplicationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
