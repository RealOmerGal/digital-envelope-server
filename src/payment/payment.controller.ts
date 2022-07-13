import { Controller, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get('/:paymentId')
  findById(@Param('paymentId') paymentId: number) {
    return this.paymentService.findById(paymentId);
  }
}
