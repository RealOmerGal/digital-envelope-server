import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/dashboard/:eventid')
  generateDashboard(@Param('eventid') eventId: number) {
    const paidGuests = this.appService.paidGuestsCount(eventId);
    const totalAmount = this.appService.totalAmount(eventId);
    return { paidGuests, totalAmount };
  }
}
