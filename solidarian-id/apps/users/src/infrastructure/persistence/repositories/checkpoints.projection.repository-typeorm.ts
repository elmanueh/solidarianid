import { ProjectionRepositoryTypeOrm } from '@app/ddd/repository/projection.repository-typeorm';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';
import { CheckpointsProjectionRepository } from '@app/users/infrastructure/persistence/repositories/checkpoints.projection.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class CheckpointsProjectionRepositoryTypeORM
  extends ProjectionRepositoryTypeOrm<CheckpointProjectionEntity>
  implements CheckpointsProjectionRepository
{
  constructor(
    @InjectRepository(CheckpointProjectionEntity)
    repository: TypeOrmRepository<CheckpointProjectionEntity>,
  ) {
    super(repository);
  }
}
