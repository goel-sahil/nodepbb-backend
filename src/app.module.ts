import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/database.config/database.config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { ApplicationModule } from './application/application.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './config/mail.config/mail.config.service';

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
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    HealthModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
