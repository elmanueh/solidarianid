import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
const AppDataSource = new DataSource(
  getTypeOrmConfig({
    entities: [UserProjectionEntity, CheckpointProjectionEntity],
    migrationsPath: 'apps/users/src/infrastructure/persistence/migrations/*.ts',
    migrationsDistPath: 'dist/apps/users/src/infrastructure/persistence/migrations/*.js',
    migrationsTableName: 'typeorm_migrations_users',
  }) as DataSourceOptions,
);

export default AppDataSource;
