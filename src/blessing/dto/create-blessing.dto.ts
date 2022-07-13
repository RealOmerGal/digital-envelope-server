import { IsNumber, IsString } from 'class-validator';

export class CreateBlessingDto {
  @IsString()
  createdBy: string;

  @IsString()
  text: string;

  @IsNumber()
  eventId: number;

  @IsNumber()
  paymentId: number;
}
