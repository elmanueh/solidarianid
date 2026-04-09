import { ProjectionRepository } from '@app/ddd/repository/projection.repository';
import { UserProjectionEntity } from '@app/users/infrastructure/persistence/projections/user.projection.entity';

export abstract class UsersProjectionRepository extends ProjectionRepository<UserProjectionEntity> {}
