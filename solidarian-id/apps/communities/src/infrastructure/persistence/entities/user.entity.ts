import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommunityUserEntity } from './community-user.entity';
import { RequestEntity } from './request.entity';
import { EventUserEntity } from './event-user.entity';
import { ObjetiveUserEntity } from './objetive-user.entity';
import { CauseUserEntity } from './cause-user.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
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

  @OneToMany(() => CauseUserEntity, causeUser => causeUser.user)
  causesList: CauseUserEntity[];
}
