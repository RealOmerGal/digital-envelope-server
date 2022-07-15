import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DashboardDto } from './app/dto/dashboard.dto';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/dashboard/:eventid')
  @Serialize(DashboardDto)
  async generateDashboard(@Param('eventid') eventId: number) {
    const paidGuests = await this.appService.paidGuestsCount(eventId);
    const totalAmount = await this.appService.totalAmount(eventId);
    const averagePerGuest = await this.appService.averagePerGuest(eventId);
    const top3Guests = await this.appService.top3Guests(eventId);
    return { paidGuests, totalAmount, averagePerGuest, top3Guests };
  }
}
