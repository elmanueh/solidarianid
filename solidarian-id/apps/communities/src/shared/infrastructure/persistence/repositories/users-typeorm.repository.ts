import { User } from '@app/communities/shared/domain/model/entities/user';
import { UsersRepositoryPort } from '@app/communities/shared/domain/ports/users.repository.port';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserEntityMapper } from '../mappers/user-entity.mapper';

@Injectable()
export class UsersTypeOrmRepositoryAdapter extends RepositoryTypeORM<User, UserEntity> implements UsersRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: TypeOrmRepository<UserEntity>,
    private readonly userMapper: UserEntityMapper,
  ) {
    super(userEntityRepository, userMapper);
  }
}
