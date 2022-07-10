import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Get('/user')
  findByUser(@Session() session: any) {
    return this.eventService.findByUser(session.user.id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
