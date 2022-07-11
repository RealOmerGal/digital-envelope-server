import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { Blessing } from './blessing.entity';
import { EventService } from '../event/event.service';

@Injectable()
export class BlessingService {
  constructor(
    @InjectRepository(Blessing) private repo: Repository<Blessing>,
    private eventService: EventService,
  ) {}

  async create(createBlessingDto: CreateBlessingDto, eventId: number) {
    const event = await this.eventService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');
    const blessing = this.repo.create({
      ...createBlessingDto,
      event: { id: eventId },
    });
    return this.repo.save(blessing);
  }

  async findByEvent(eventId: number) {
    return this.repo.find({ where: { event: { id: eventId } } });
  }
}
