import { Index, Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EventEntity } from './event.entity';
import { UserEntity } from './user.entity';

@Index(['eventId', 'userId'])
@Entity('event_user')
export class EventUserEntity {
  @PrimaryColumn()
  eventId: string;

  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  mobilePhone?: string;

  @Column()
  fullname: string;

  @ManyToOne(() => EventEntity, event => event.assistants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @ManyToOne(() => UserEntity, user => user.eventsList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
