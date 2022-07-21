import { Event } from 'src/event/event.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
