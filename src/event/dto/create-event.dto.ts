import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { EventTypes } from '../event.entity';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsNumberString()
  estimatedGuests: number;

  @IsEnum(EventTypes)
  type: EventTypes;
}
