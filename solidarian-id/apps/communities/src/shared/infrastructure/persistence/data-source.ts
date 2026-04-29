import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CommunityUserEntity } from '../../../communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '../../../communities/infrastructure/persistence/entities/community.entity';
import { RequestEntity } from './entities/request.entity';
import { UserEntity } from './entities/user.entity';

const COMMUNITIES_ENTITIES = [
  UserEntity,
  CommunityEntity,
  CommunityUserEntity,
  CauseUserEntity,
  CauseEntity,
  ActionEntity,
  ObjectiveEntity,
  EventEntity,
  EventUserEntity,
  ObjetiveUserEntity,
  RequestEntity,
  SubscriptionEntity,
];

const AppDataSource = new DataSource(
  getTypeOrmConfig({
    entities: COMMUNITIES_ENTITIES,
    migrationsPath: 'apps/communities/src/shared/infrastructure/persistence/migrations/*.ts',
    migrationsDistPath: 'dist/apps/communities/src/shared/infrastructure/persistence/migrations/*.js',
    databaseEnvKey: 'POSTGRES_COMMUNITIES_DB',
  }) as DataSourceOptions,
);

export default AppDataSource;
