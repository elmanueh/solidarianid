import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
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
              entities: [UserEntity, UserPreferenceEntity, RefreshTokenEntity],
              migrationsPath: 'apps/users/src/infrastructure/persistence/migrations/*.ts',
              migrationsDistPath: 'dist/apps/users/src/infrastructure/persistence/migrations/*.js',
            }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
