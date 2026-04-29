import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CauseUserEntity } from './cause-user.entity';

@Entity('cause')
export class CauseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('timestamptz')
  initialDate: Date;

  @Column()
  durationDays: number;

  @Column('simple-json')
  ods: number[];

  @Column({ nullable: false })
  communityId: string;

  @ManyToOne(() => CommunityEntity, community => community.causes)
  @JoinColumn({ name: 'communityId' })
  community: CommunityEntity;

  @OneToMany(() => ActionEntity, action => action.cause, {
    cascade: true,
  })
  actions: ActionEntity[];

  @OneToMany(() => CauseUserEntity, causeUser => causeUser.cause, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  users: CauseUserEntity[];
}
