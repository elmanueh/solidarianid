import { ActionEntity } from '@app/communities/infrastructure/persistence/entities/action.entity';
import { ObjetiveUserEntity } from '@app/communities/infrastructure/persistence/entities/objetive-user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => ObjetiveUserEntity, objectiveUser => objectiveUser.objective, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  contributors: ObjetiveUserEntity[];
}
