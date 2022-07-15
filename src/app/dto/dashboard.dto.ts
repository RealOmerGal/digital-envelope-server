import { Expose, Transform } from 'class-transformer';

export class DashboardDto {
  @Expose()
  paidGuests: {
    current: number;
    max: number;
  };

  @Transform(({ obj }) => obj.averagePerGuest.avg)
  @Expose()
  averagePerGuest: number;

  @Transform(({ obj }) => obj.totalAmount.sum)
  @Expose()
  totalAmount: number;

  @Expose()
  top3Guests: Array<{ createdBy: string; amount: number }>;
}
