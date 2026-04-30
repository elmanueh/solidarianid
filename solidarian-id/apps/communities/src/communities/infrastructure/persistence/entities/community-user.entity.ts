import { MemberType } from '@app/communities/shared/domain/model/enums/member-type';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../../../shared/infrastructure/persistence/entities/user.entity';
import { CommunityEntity } from './community.entity';

@Index(['communityId', 'userId', 'role'])
@Entity('community_user')
export class CommunityUserEntity {
  @PrimaryColumn()
  communityId: string;

  @PrimaryColumn()
  userId: string;

  @Column({
    type: 'enum',
    enum: MemberType,
    default: MemberType.MEMBER,
  })
  role: MemberType;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => CommunityEntity, community => community.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'communityId' })
  community: CommunityEntity;

  @ManyToOne(() => UserEntity, user => user.communityMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
