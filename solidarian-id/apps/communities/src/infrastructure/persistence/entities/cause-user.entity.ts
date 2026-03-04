import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CauseEntity } from './cause.entity';
import { UserEntity } from './user.entity';

@Index(['causeId', 'userId'])
@Entity('cause_user')
export class CauseUserEntity {
  @PrimaryColumn()
  causeId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => CauseEntity, cause => cause.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'causeId' })
  cause: CauseEntity;

  @ManyToOne(() => UserEntity, user => user.causesList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
