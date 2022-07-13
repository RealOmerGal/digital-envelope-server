import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { Blessing } from './blessing.entity';
import { EventService } from '../event/event.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class BlessingService {
  constructor(
    @InjectRepository(Blessing) private repo: Repository<Blessing>,
    private eventService: EventService,
    private paymentService: PaymentService
  ) { }

  async create(createBlessingDto: CreateBlessingDto) {
    const { eventId, paymentId, ...blessing } = { ...createBlessingDto };

    const event = await this.eventService.findOne(eventId);
    const payment = await this.paymentService.findById(paymentId);

    if (!event && payment) throw new NotFoundException();

    const savedBlessing = this.repo.create({
      payment,
      event,
      ...blessing,
    });
    return this.repo.save(savedBlessing);
  }

  findByEvent(eventId: number) {
    return this.repo.find({ relations: ['payment', 'event'], where: { event: { id: eventId } } });

  }
}
