import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommunityUserEntity } from './community-user.entity';
import { RequestEntity } from './request.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @OneToMany(() => CommunityUserEntity, member => member.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  communityMembers: CommunityUserEntity[];

  @OneToMany(() => RequestEntity, request => request.user)
  requests: RequestEntity[];
}
