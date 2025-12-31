import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ActionEntity } from './action.entity';
import { UserEntity } from './user.entity';

@Entity('Objetive')
export class ObjetiveEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  currentAmount: number;

  @Column()
  actionId: string;

  @ManyToOne(() => ActionEntity, (action) => action.objectives)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'objective_contributors',
    joinColumn: { name: 'objectiveId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  contributors: UserEntity[];
}
