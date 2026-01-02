import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RequestType } from '@app/communities/domain/model/enums/request-type';

@Entity('requests')
export class RequestEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  reason: string;

  @Column()
  status: string;

  @Column({
    type: 'enum',
    enum: [RequestType.COMMUNITY, RequestType.CAUSE, RequestType.ACTION],
  })
  type: RequestType;

  @ManyToOne(() => UserEntity, (user) => user.requests)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
