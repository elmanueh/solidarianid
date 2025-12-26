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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UserMapper,
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
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
