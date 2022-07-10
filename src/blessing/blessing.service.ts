import { Injectable } from '@nestjs/common';
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
    const blessing = this.repo.create({ ...createBlessingDto, event });
    return this.repo.save(blessing);
  }

  async findByEvent(eventId) {
    const event = await this.eventService.findOne(eventId);
    return this.repo.find({ where: { event: { id: event.id } } });
  }
}
