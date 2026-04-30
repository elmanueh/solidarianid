import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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
