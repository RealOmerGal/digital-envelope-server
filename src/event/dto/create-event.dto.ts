import { IsNumberString, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsNumberString()
  estimatedGuests: number;
}
