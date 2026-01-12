import { Index, Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { ObjectiveEntity } from './objective.entity';

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
