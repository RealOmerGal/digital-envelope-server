import { Blessing } from '../blessing/blessing.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

export enum EventTypes {
  Wedding = 'Wedding',
  Birthday = 'Birthday',
  Party = 'Party',
  Other = 'Other',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @Column()
  estimatedGuests: number;

  @Column({ type: 'enum', enum: EventTypes })
  type: EventTypes;

  @Column({ default: false })
  closed: boolean;

  @OneToMany(() => Blessing, (blessing) => blessing.event)
  blessings: Blessing[];
}
