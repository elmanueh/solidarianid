import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { ActionEntity } from './action.entity';
import { UserEntity } from './user.entity';

@Entity('objective')
export class ObjectiveEntity {
  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  actionId: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  currentAmount: number;

  @ManyToOne(() => ActionEntity, action => action.objectives)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'objective_contributors',
    joinColumns: [
      { name: 'objectiveName', referencedColumnName: 'name' },
      { name: 'objectiveActionId', referencedColumnName: 'actionId' },
    ],
    inverseJoinColumns: [{ name: 'userId', referencedColumnName: 'id' }],
  })
  contributors: UserEntity[];
}
