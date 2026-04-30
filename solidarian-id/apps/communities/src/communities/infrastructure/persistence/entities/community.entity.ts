import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

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
