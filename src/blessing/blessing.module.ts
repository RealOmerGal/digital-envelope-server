import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { Blessing } from './blessing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Blessing])],
  controllers: [BlessingController],
  providers: [BlessingService],
})
export class BlessingModule {}
