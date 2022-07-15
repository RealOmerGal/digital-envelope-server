import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BlessingModule } from './blessing/blessing.module';
import { Blessing } from './blessing/blessing.entity';
import { Event } from './event/event.entity';
import { EventModule } from './event/event.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/payment.entity';
import { APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';

@Module({
  imports: [
    EventModule,
    BlessingModule,
    UserModule,
    AuthModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [Blessing, Event, User, Payment],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: QueryFailedErrorFilter,
    // },
  ],
})
export class AppModule {}
