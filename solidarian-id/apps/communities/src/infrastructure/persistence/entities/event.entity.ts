import { ActionEntity } from '@app/communities/infrastructure/persistence/entities/action.entity';
import { EventPlaceEntity } from '@app/communities/infrastructure/persistence/entities/event-place.entity';
import { EventUserEntity } from '@app/communities/infrastructure/persistence/entities/event-user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => EventUserEntity, eventUser => eventUser.event, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  assistants: EventUserEntity[];
}
