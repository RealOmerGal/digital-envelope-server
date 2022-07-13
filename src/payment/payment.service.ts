import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) { }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }
}
