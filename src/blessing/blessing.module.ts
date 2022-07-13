import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { EventModule } from '../event/event.module';
import { Blessing } from './blessing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../event/event.entity';
import { PaymentModule } from '../payment/payment.module';
import { Payment } from '../payment/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blessing, Event, Payment]), EventModule, PaymentModule],
  controllers: [BlessingController],
  providers: [BlessingService],
})
export class BlessingModule { }
