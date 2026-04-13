import { ProjectionRepositoryTypeOrm } from '@app/ddd/repository/projection.repository-typeorm';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';
import { UsersProjectionRepository } from '@app/users/infrastructure/persistence/repositories/users.projection.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class UsersProjectionRepositoryTypeORM
  extends ProjectionRepositoryTypeOrm<UserProjectionEntity>
  implements UsersProjectionRepository
{
  constructor(
    @InjectRepository(UserProjectionEntity)
    repository: TypeOrmRepository<UserProjectionEntity>,
  ) {
    super(repository);
  }
}
