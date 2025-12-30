import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';
import { UsersServiceImpl } from './application/services/users.service.impl';
import { UsersRepositoryPort } from './domain/ports/users.repository.port';
import { UsersService } from './domain/services/users.service';
import { UsersRepositoryTypeORM } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { UserMapper } from './infrastructure/persistence/mappers/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { PasswordManager } from '@app/utils/security/password-manager';
import { PasswordManagerBcrypt } from '@app/utils/security/password-manager-bcrypt';
import { KafkaDynamicModule } from '@solidarianid/kafka';
import { UsersPublisherPort } from './domain/ports/users.publisher.port';
import { UsersKafkaPublisherAdapter } from './infrastructure/messaging/producer/user.publisher';
import { UserConsumerAdapter } from './infrastructure/messaging/consumer/user.consumer';
import { UserEventMapper } from './infrastructure/messaging/mappers/user.event.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    KafkaDynamicModule.register(process.env.KAFKA_USERS_CLIENT_ID ?? 'users'),
  ],
  controllers: [UsersController, UserConsumerAdapter],
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
