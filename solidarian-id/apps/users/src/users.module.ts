import { DomainEvents } from '@app/ddd/domain-events';
import { UsersDomainEvents } from '@app/users/infrastructure/messaging/providers/users.domain-events.provider';
import { DatabaseModule } from '@app/users/infrastructure/persistence/database.module';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { UsersProjectionService } from '@app/users/infrastructure/persistence/projections/users-projection.service';
import { CheckpointsProjectionRepository } from '@app/users/infrastructure/persistence/repositories/checkpoints.projection.repository';
import { CheckpointsProjectionRepositoryTypeORM } from '@app/users/infrastructure/persistence/repositories/checkpoints.projection.repository-typeorm';
import { UsersRepositoryKurrentDb } from '@app/users/infrastructure/persistence/repositories/users-kurrentdb.repository';
import { UsersProjectionRepository } from '@app/users/infrastructure/persistence/repositories/users.projection.repository';
import { UsersProjectionRepositoryTypeORM } from '@app/users/infrastructure/persistence/repositories/users.projection.repository-typeorm';
import { PasswordManager } from '@app/utils/security/password-manager';
import { PasswordManagerBcrypt } from '@app/utils/security/password-manager-bcrypt';
import { KurrentDBClient } from '@kurrent/kurrentdb-client';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { SecurityAuthorizationModule } from '@solidarianid/security/nestjs';
import { UsersServiceImpl } from './application/services/users.service.impl';
import { UsersPublisherPort } from './domain/ports/users.publisher.port';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { UsersService } from './domain/services/users.service';
import { UserEventMapper } from './infrastructure/messaging/mappers/user.event.mapper';
import { UsersKafkaPublisherAdapter } from './infrastructure/messaging/producer/user.publisher';
import { UserMapper } from './infrastructure/persistence/mappers/user.mapper';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';
import { SelfOwnershipPolicy } from './infrastructure/authz/policies/self-ownership.policy';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    TypeOrmModule.forFeature([UserProjectionEntity, CheckpointProjectionEntity]),
    KafkaDynamicModule.register(process.env.KAFKA_USERS_CLIENT_ID ?? 'users'),
    SecurityAuthorizationModule.register({ evaluators: [SelfOwnershipPolicy] }),
  ],
  controllers: [UsersController],
  providers: [
    UserMapper,
    UserEventMapper,
    UsersProjectionService,
    DomainEvents,
    UsersDomainEvents,
    {
      provide: UsersProjectionRepository,
      useClass: UsersProjectionRepositoryTypeORM,
    },
    {
      provide: CheckpointsProjectionRepository,
      useClass: CheckpointsProjectionRepositoryTypeORM,
    },
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
    {
      provide: UsersPublisherPort,
      useClass: UsersKafkaPublisherAdapter,
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersRepositoryKurrentDb,
    },
    {
      provide: PasswordManager,
      useClass: PasswordManagerBcrypt,
    },
    {
      provide: 'EVENT_STORE',
      useFactory: () => {
        const connectionString = process.env.EVENT_STORE_URL || 'kurrentdb://localhost:2113?tls=false';
        return KurrentDBClient.connectionString(connectionString);
      },
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
