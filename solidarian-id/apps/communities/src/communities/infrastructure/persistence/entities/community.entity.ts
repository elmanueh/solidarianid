import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CommunityEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;
}
