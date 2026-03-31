import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    // En modo test, PostgreSQLTestModule ya provee la conexión TypeORM
    if (process.env.NODE_ENV === 'test') {
      return {
        module: DatabaseModule,
        exports: [],
      };
    }

    // En desarrollo/producción, crear la conexión TypeORM
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>
            getTypeOrmConfig({
              config,
              entities: [UserProjectionEntity, CheckpointProjectionEntity],
              migrationsPath: 'apps/users/src/infrastructure/persistence/migrations/*.ts',
              migrationsDistPath: 'dist/apps/users/src/infrastructure/persistence/migrations/*.js',
              migrationsTableName: 'typeorm_migrations_users',
            }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
