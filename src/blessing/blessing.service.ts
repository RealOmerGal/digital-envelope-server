import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { Blessing } from './entities/blessing.entity';
import { EventService } from '../event/event.service';

@Injectable()
export class BlessingService {

  constructor(@InjectRepository(Blessing) private repo: Repository<Blessing>,
    private eventService: EventService
  ) { }

  async create({ text, createdBy }: CreateBlessingDto, eventId: number) {

    const event = await this.eventService.findOne(eventId);
    if (!event) throw new NotFoundException("Event not found");

    const blessing = this.repo.create({ text, createdBy, event });
    return this.repo.save(blessing);
  }

  async findAllByEvent(eventId) {
    // TODO: Format the result to only include the eventId and not the whole event using DTO/Interceptor/Middleware
    const event = await this.eventService.findOne(eventId);
    if (!event) throw new NotFoundException("Event not found");

    return this.repo.find({
      where: { event: { id: event.id } }
    })
  }
}
