import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunityEntityMapper } from '../mappers/community-entity.mapper';
import { Either, left, right, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { In } from 'typeorm';

@Injectable()
export class CommunitiesRepositoryTypeOrmAdapter
  extends RepositoryTypeORM<Community, CommunityEntity>
  implements CommunitiesRepositoryPort
{
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: TypeOrmRepository<CommunityEntity>,
    private readonly communityMapper: CommunityEntityMapper,
  ) {
    super(communityRepository, communityMapper);
  }

  async findAllByIds(
    ids: string[],
    relations: string[] = ['members', 'members.user'],
  ): Promise<Either<ValidationError | RepositoryException, Community[]>> {
    if (ids.length === 0) {
      return right([]);
    }

    try {
      const entities = await this.communityRepository.find({
        where: { id: In(ids) },
        relations,
      });

      const communitiesOrError = sequence(entities.map(entity => this.communityMapper.fromPersistence(entity)));

      if (communitiesOrError.isLeft()) {
        return left(communitiesOrError.value);
      }

      return right(communitiesOrError.value);
    } catch (error) {
      return left(new RepositoryException('Failed to find communities by ids.', error));
    }
  }
}
