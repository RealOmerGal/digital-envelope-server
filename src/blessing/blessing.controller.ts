import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { BlessingService } from './blessing.service';
import { BlessingDto } from './dto/blessing.dto';
import { CreateBlessingDto } from './dto/create-blessing.dto';

@Controller('blessing')
// @Serialize(BlessingDto)
export class BlessingController {
  constructor(private readonly blessingService: BlessingService) { }

  @Post('/:eventid')
  create(
    @Body() createBlessingDto: CreateBlessingDto,
    @Param('eventid') eventId: number,
  ) {
    return this.blessingService.create(createBlessingDto, eventId);
  }

  @Get('/:eventid')
  findByEvent(@Param('eventid') eventId: string) {
    return this.blessingService.findByEvent(eventId);
  }
}
