import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CauseEntity } from './cause.entity';
import { EventEntity } from './evento.entity';
import { ObjectiveEntity } from './objetive.entity';

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

  @ManyToOne(() => CauseEntity, (cause) => cause.actions)
  @JoinColumn({ name: 'causeId' })
  cause: CauseEntity;

  @OneToMany(() => ObjectiveEntity, (objective) => objective.action, {
    cascade: true,
  })
  objectives: ObjectiveEntity[];

  @OneToMany(() => EventEntity, (event) => event.action, {
    cascade: true,
  })
  events: EventEntity[];
}
