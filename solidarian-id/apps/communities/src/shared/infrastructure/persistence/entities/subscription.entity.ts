import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  endpoint: string;

  @Column()
  p256dh: string;

  @Column()
  auth: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('uuid', { array: true, default: [] })
  requestIds: string[];

  @Column('uuid', { array: true, default: [] })
  communityFollowedIds: string[];

  @Column('uuid', { array: true, default: [] })
  causeFollowedIds: string[];
}
