import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommunityEntity } from './community.entity';
import { UserEntity } from './user.entity';

@Index(['communityId', 'role'])
@Entity('community_user')
export class CommunityUserEntity {
  @PrimaryColumn()
  communityId: string;

  @PrimaryColumn()
  userId: string;

  @Column({
    type: 'enum',
    enum: ['creator', 'admin', 'member'],
    default: 'member',
  })
  role: string;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => CommunityEntity, (community) => community.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'communityId' })
  community: CommunityEntity;

  @ManyToOne(() => UserEntity, (user) => user.communityMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
