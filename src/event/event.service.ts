import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {

  constructor(@InjectRepository(Event) private repo: Repository<Event>) { }

  create({ name }: CreateEventDto) {
    const event = this.repo.create({ name });
    return this.repo.save(event);
  }

  findAllByUser(userId: number) {
    //Select all evnets created by given user
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<Event>) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException('Event not found');
    Object.assign(event, attrs);
    return this.repo.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException('Event not found');
    return this.repo.remove(event);
  }
}
