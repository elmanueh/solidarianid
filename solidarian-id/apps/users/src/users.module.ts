import { DatabaseModule } from '@app/users/infrastructure/persistence/database.module';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { PasswordManager } from '@app/utils/security/password-manager';
import { PasswordManagerBcrypt } from '@app/utils/security/password-manager-bcrypt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { UsersServiceImpl } from './application/services/users.service.impl';
import { UsersPublisherPort } from './domain/ports/users.publisher.port';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { UsersService } from './domain/services/users.service';
import { UserEventMapper } from './infrastructure/messaging/mappers/user.event.mapper';
import { UsersKafkaPublisherAdapter } from './infrastructure/messaging/producer/user.publisher';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserMapper } from './infrastructure/persistence/mappers/user.mapper';
import { UsersRepositoryTypeORM } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, UserPreferenceEntity]),
    KafkaDynamicModule.register(process.env.KAFKA_USERS_CLIENT_ID ?? 'users'),
  ],
  controllers: [UsersController],
  providers: [
    UserMapper,
    UserEventMapper,
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
      useClass: UsersRepositoryTypeORM,
    },
    {
      provide: PasswordManager,
      useClass: PasswordManagerBcrypt,
    },
  ],
})
export class UsersModule {}
