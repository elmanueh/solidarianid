import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_preferences' })
export class UserPreferenceEntity {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity, user => user.preferences)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('int', { array: true, name: 'preferred_sdgs', default: '{}' })
  preferredSDGs: SustainableDevelopmentGoal[];

  @Column('text', { array: true, name: 'preferred_categories', default: '{}' })
  preferredCategories: CauseCategory[];

  @Column('text', { array: true, name: 'duration_preferences', default: '{any}' })
  durationPreferences: DurationPreference[];

  @Column({ name: 'notifications_enabled', default: false })
  notificationsEnabled: boolean;
}
