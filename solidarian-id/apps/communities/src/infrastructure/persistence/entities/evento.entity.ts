import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { EventPlaceEntity } from './event-place.entity';
import { ActionEntity } from './action.entity';
import { UserEntity } from './user.entity';

@Entity('event')
export class EventEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column(() => EventPlaceEntity)
  place: EventPlaceEntity;

  @Column({ nullable: false })
  actionId: string;

  @ManyToOne(() => ActionEntity, (action) => action.events)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'objective_assistants',
    joinColumn: { name: 'objectiveId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  assistants: UserEntity[];
}
