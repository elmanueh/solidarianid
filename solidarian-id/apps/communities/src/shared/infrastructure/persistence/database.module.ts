import { ActionEntity } from '@app/communities/actions/infrastructure/persistence/entities/action.entity';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { ObjectiveEntity } from '@app/communities/actions/infrastructure/persistence/entities/objective.entity';
import { ObjetiveUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/objetive-user.entity';
import { CauseUserEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause-user.entity';
import { CauseEntity } from '@app/communities/causes/infrastructure/persistence/entities/cause.entity';
import { CommunityUserEntity } from '@app/communities/communities/infrastructure/persistence/entities/community-user.entity';
import { CommunityEntity } from '@app/communities/communities/infrastructure/persistence/entities/community.entity';
import { RequestEntity } from '@app/communities/shared/infrastructure/persistence/entities/request.entity';
import { SubscriptionEntity } from '@app/communities/shared/infrastructure/persistence/entities/subscription.entity';
import { UserEntity } from '@app/communities/shared/infrastructure/persistence/entities/user.entity';
import { getTypeOrmConfig } from '@app/ddd/repository/modules/database-typeorm.module';
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
                SubscriptionEntity,
              ],
              migrationsPath: 'apps/communities/src/shared/infrastructure/persistence/migrations/*.ts',
              migrationsDistPath: 'dist/apps/communities/src/shared/infrastructure/persistence/migrations/*.js',
              databaseEnvKey: 'POSTGRES_COMMUNITIES_DB',
            }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
