import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseEntity } from '../entities/cause.entity';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CauseEntityMapper } from '../mappers/cause-entity.mapper';
import { Either, left, right, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { In } from 'typeorm';

@Injectable()
export class CausesRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Cause, CauseEntity>
  implements CausesRepositoryPort
{
  constructor(
    @InjectRepository(CauseEntity)
    private readonly causeRepository: TypeOrmRepository<CauseEntity>,
    private readonly causeMapper: CauseEntityMapper,
  ) {
    super(causeRepository, causeMapper);
  }

  async findAllByCommunityIds(
    communityIds: string[],
    actions: boolean = false,
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    if (communityIds.length === 0) {
      return right([]);
    }

    try {
      const causeEntities = await this.causeRepository.find({
        where: { communityId: In(communityIds) },
        relations: actions ? ['actions', 'actions.events', 'actions.objectives', 'users'] : ['users'],
      });

      const causes = sequence(causeEntities.map(entity => this.causeMapper.fromPersistence(entity)));

      if (causes.isLeft()) {
        return left(causes.value);
      }

      return right(causes.value);
    } catch (error) {
      return left(new RepositoryException('Failed to find causes by community ids.', error));
    }
  }

  async findAllByCommunityId(
    communityId: string,
    actions: boolean = false,
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    const causeEntities = await this.causeRepository.find({
      where: { communityId },
      relations: actions ? ['actions', 'users'] : ['users'],
    });

    const causes = sequence(causeEntities.map(entity => this.causeMapper.fromPersistence(entity)));

    if (causes.isLeft()) {
      return left(causes.value);
    }

    return right(causes.value);
  }

  async findByCommunityIdAndCauseId(
    communityId: string,
    causeId: string,
    actions: boolean = false,
  ): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeEntity = await this.causeRepository.findOne({
      where: { id: causeId, communityId },
      relations: actions ? ['actions', 'users'] : ['users'],
    });

    if (!causeEntity) {
      return left(
        new EntityNotFoundException(
          Cause.name,
          causeId,
          `Cause with id ${causeId} for community ${communityId} not found`,
        ),
      );
    }

    const causeOrError = this.causeMapper.fromPersistence(causeEntity);

    if (causeOrError.isLeft()) {
      return left(causeOrError.value);
    }

    return right(causeOrError.value);
  }
}
