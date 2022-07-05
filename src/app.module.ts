import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlessingModule } from './blessing/blessing.module';
import { Blessing } from './blessing/entities/blessing.entity';
import { Event } from './event/entities/event.entity';
import { EventModule } from './event/event.module';

@Module({
  imports: [EventModule, ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      const url = config.get<string>('DATABASE_URL');
      return {
        type: 'postgres',
        url,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false
        },
        entities: [Blessing, Event]
      }
    }
  }), BlessingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
