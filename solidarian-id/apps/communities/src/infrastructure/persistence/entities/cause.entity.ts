import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CommunityEntity } from './community.entity';
import { ActionEntity } from './action.entity';

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
}
