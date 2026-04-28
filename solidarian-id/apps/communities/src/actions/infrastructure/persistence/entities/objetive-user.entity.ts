import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Index(['name', 'actionId', 'userId'])
@Entity('objective_user')
export class ObjetiveUserEntity {
  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  actionId: string;

  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  mobilePhone?: string;

  @Column()
  fullname: string;

  @ManyToOne(() => ObjectiveEntity, objective => objective.contributors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'name', referencedColumnName: 'name' },
    { name: 'actionId', referencedColumnName: 'actionId' },
  ])
  objective: ObjectiveEntity;

  @ManyToOne(() => UserEntity, user => user.objectivesList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
