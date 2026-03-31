import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserPreferenceEntity } from './entities/user-preference.entity';
import { UserEntity } from './entities/user.entity';
const AppDataSource = new DataSource(
  getTypeOrmConfig({
    entities: [UserEntity, UserPreferenceEntity],
    migrationsPath: 'apps/users/src/infrastructure/persistence/migrations/*.ts',
    migrationsDistPath: 'dist/apps/users/src/infrastructure/persistence/migrations/*.js',
    migrationsTableName: 'typeorm_migrations_users',
  }) as DataSourceOptions,
);

export default AppDataSource;
