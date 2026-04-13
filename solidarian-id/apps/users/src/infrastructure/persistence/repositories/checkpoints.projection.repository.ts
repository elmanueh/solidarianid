import { ProjectionRepository } from '@app/ddd/repository/projection.repository';
import { CheckpointProjectionEntity } from '@app/users/infrastructure/persistence/projections/checkpoint.projection.entity';

export abstract class CheckpointsProjectionRepository extends ProjectionRepository<CheckpointProjectionEntity> {}
