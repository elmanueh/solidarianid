import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@app/users/infrastructure/presentation/controllers/users.controller';
import { UsersService } from '@app/users/application/services/users.service';
import { UsersRepositoryPort } from '@app/users/domain/ports/output/users.repository.port';
import { UsersServicePort } from '@app/users/domain/ports/input/users.service.port';
import { UsersRepositoryTypeORM } from '@app/users/infrastructure/persistence/repositories/users-typeorm.repository';
import { UserMapper } from '@app/users/infrastructure/persistence/mappers/user.mapper';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';

/**
 * Módulo de Users configurado para tests E2E
 * Usa BD SQLite en memoria en lugar de archivo
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [
    UserMapper,
    {
      provide: UsersServicePort,
      useClass: UsersService,
    },
    {
      provide: UsersRepositoryPort,
      useClass: UsersRepositoryTypeORM,
    },
  ],
})
export class UsersTestModule {}
