import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommunityUserEntity } from './community-user.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @OneToMany(() => CommunityUserEntity, (member) => member.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  communityMembers: CommunityUserEntity[];
}
