import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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
