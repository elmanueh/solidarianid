import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ActionEntity } from './action.entity';
import { ObjetiveUserEntity } from './objetive-user.entity';

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

  @OneToMany(() => ObjetiveUserEntity, objectiveUser => objectiveUser.objective)
  contributors: ObjetiveUserEntity[];
}
