import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommunityUserEntity } from './community-user.entity';
import { RequestEntity } from './request.entity';
import { EventUserEntity } from './event-user';
import { ObjetiveUserEntity } from './objetive-user';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  fullName: string;

  @Column({ nullable: true })
  mobilePhone?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => CommunityUserEntity, member => member.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  communityMembers: CommunityUserEntity[];

  @OneToMany(() => RequestEntity, request => request.user)
  requests: RequestEntity[];

  @OneToMany(() => EventUserEntity, eventUser => eventUser.user)
  eventsList: EventUserEntity[];

  @OneToMany(() => ObjetiveUserEntity, objectiveUser => objectiveUser.user)
  objectivesList: ObjetiveUserEntity[];
}
