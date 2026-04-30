import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('action')
export class ActionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: false })
  causeId: string;

  @ManyToOne(() => CauseEntity, cause => cause.actions)
  @JoinColumn({ name: 'causeId' })
  cause: CauseEntity;

  @OneToMany(() => ObjectiveEntity, objective => objective.action, {
    cascade: true,
  })
  objectives: ObjectiveEntity[];

  @OneToMany(() => EventEntity, event => event.action, {
    cascade: true,
  })
  events: EventEntity[];
}
