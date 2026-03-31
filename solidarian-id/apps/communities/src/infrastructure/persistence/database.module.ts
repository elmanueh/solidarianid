import { ActionEntity } from '@app/communities/infrastructure/persistence/entities/action.entity';
import { CauseUserEntity } from '@app/communities/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/infrastructure/persistence/entities/cause.entity';
import { CommunityUserEntity } from '@app/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/infrastructure/persistence/entities/community.entity';
import { EventUserEntity } from '@app/communities/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/infrastructure/persistence/entities/objetive-user.entity';
import { RequestEntity } from '@app/communities/infrastructure/persistence/entities/request.entity';
import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
import { UserEntity } from '@app/communities/infrastructure/persistence/entities/user.entity';
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
              entities: [
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
              ],
              migrationsPath: 'apps/communities/src/infrastructure/persistence/migrations/*.ts',
              migrationsDistPath: 'dist/apps/communities/src/infrastructure/persistence/migrations/*.js',
              migrationsTableName: 'typeorm_migrations_communities',
            }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
