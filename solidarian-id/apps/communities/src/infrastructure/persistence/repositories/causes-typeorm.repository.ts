import { Cause } from '@app/communities/domain/model/entities/cause';
import { CausesRepositoryPort } from '@app/communities/domain/ports/causes.repository.port';
import { CauseUserEntity } from '@app/communities/infrastructure/persistence/entities/cause-user.entity';
import { Either, left, right, sequence } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository as TypeOrmRepository } from 'typeorm';
import { CauseEntity } from '../entities/cause.entity';
import { CauseEntityMapper } from '../mappers/cause-entity.mapper';

@Injectable()
export class CausesRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Cause, CauseEntity>
  implements CausesRepositoryPort
{
  constructor(
    @InjectRepository(CauseEntity)
    private readonly causeRepository: TypeOrmRepository<CauseEntity>,
    @InjectRepository(CauseUserEntity)
    private readonly causeUserRepository: TypeOrmRepository<CauseUserEntity>,
    private readonly causeMapper: CauseEntityMapper,
  ) {
    super(causeRepository, causeMapper);
  }

  async findAllFollowedCauseIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>> {
    try {
      const followers = await this.causeUserRepository.find({
        where: { userId },
        select: {
          causeId: true,
        },
      });

      const causeIds = Array.from(new Set(followers.map(follower => follower.causeId)));

      return right(causeIds);
    } catch (error) {
      return left(new RepositoryException(`Failed to find followed causes by user id ${userId}.`, error));
    }
  }

  async findAllByCommunityIds(
    communityIds: string[],
    relations: string[] = ['users'],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    if (communityIds.length === 0) {
      return right([]);
    }

    try {
      const causeEntities = await this.causeRepository.find({
        where: { communityId: In(communityIds) },
        relations,
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
    relations: string[] = ['users'],
  ): Promise<Either<ValidationError | RepositoryException, Cause[]>> {
    const causeEntities = await this.causeRepository.find({
      where: { communityId },
      relations,
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
    relations: string[] = ['users'],
  ): Promise<Either<ValidationError | RepositoryException, Cause>> {
    const causeEntity = await this.causeRepository.findOne({
      where: { id: causeId, communityId },
      relations,
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

  async removeFollower(causeId: string, userId: string): Promise<Either<ValidationError | RepositoryException, void>> {
    try {
      await this.causeUserRepository.delete({ causeId, userId });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryException('Failed to remove follower from cause.', error));
    }
  }
}
