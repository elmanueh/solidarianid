import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { CommunityUserEntity } from './community-user.entity';
import { CauseEntity } from './cause.entity';

@Entity('community')
export class CommunityEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CommunityUserEntity, member => member.community, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  members: CommunityUserEntity[];

  @OneToMany(() => CauseEntity, cause => cause.community, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  causes: CauseEntity[];
}
