import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CommunityEntity } from './entities/community.entity';
import { CommunityUserEntity } from './entities/community-user.entity';
import { CauseUserEntity } from './entities/cause-user.entity';
import { CauseEntity } from './entities/cause.entity';
import { ActionEntity } from './entities/action.entity';
import { ObjectiveEntity } from './entities/objective.entity';
import { EventEntity } from './entities/event.entity';
import { EventUserEntity } from './entities/event-user.entity';
import { ObjetiveUserEntity } from './entities/objetive-user.entity';
import { RequestEntity } from './entities/request.entity';

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
];
const AppDataSource = new DataSource(
  getTypeOrmConfig({
    entities: COMMUNITIES_ENTITIES,
    migrationsPath: 'apps/communities/src/infrastructure/persistence/migrations/*.ts',
    migrationsDistPath: 'dist/apps/communities/src/infrastructure/persistence/migrations/*.js',
    migrationsTableName: 'typeorm_migrations_communities',
  }) as DataSourceOptions,
);

export default AppDataSource;
