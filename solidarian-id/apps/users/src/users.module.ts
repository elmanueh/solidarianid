import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UsersController } from './infrastructure/presentation/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { UsersRepositoryPort } from './domain/ports/output/users.repository.port';
import { UsersServicePort } from './domain/ports/input/users.service.port';
import { UsersRepositoryTypeORM } from './infrastructure/persistence/repositories/users-typeorm.repository';
import { UserMapper } from './infrastructure/persistence/mappers/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join('@app', 'users', '.env'),
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
export class UsersModule {}
