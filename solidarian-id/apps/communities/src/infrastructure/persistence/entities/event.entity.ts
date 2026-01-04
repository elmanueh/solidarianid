import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { EventPlaceEntity } from './event-place.entity';
import { ActionEntity } from './action.entity';
import { EventUserEntity } from './event-user';

@Entity('event')
export class EventEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamptz' })
  initialDate: Date;

  @Column(() => EventPlaceEntity)
  place: EventPlaceEntity;

  @Column({ nullable: false })
  actionId: string;

  @ManyToOne(() => ActionEntity, action => action.events)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;

  @OneToMany(() => EventUserEntity, eventUser => eventUser.event)
  assistants: EventUserEntity[];
}
