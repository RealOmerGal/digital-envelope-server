import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { EventModule } from '../event/event.module';
import { Blessing } from './entities/blessing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/entities/event.entity';
// import { Payment } from '../payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blessing, Event]), EventModule],
  controllers: [BlessingController],
  providers: [BlessingService],
})
export class BlessingModule { }
