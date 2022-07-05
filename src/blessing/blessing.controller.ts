import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { CreateBlessingDto } from './dto/create-blessing.dto';

@Controller('blessing')
export class BlessingController {
  constructor(private readonly blessingService: BlessingService) { }

  @Post("/:eventid")
  create(@Body() createBlessingDto: CreateBlessingDto, @Param('eventid') eventId: number) {
    return this.blessingService.create(createBlessingDto, eventId);
  }

  @Get("/:eventid")
  findAllByEvent(@Param('eventid') eventId: string) {
    return this.blessingService.findAllByEvent(eventId);
  }

}
