import { Either, left, right } from '@app/ddd/either';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { CommunitiesRepositoryPort } from '@app/communities/communities/domain/ports/communities.repository.port';
import { Community } from '@app/communities/communities/domain/model/aggregates/community';
import { CommunityEntity } from '../entities/community.entity';
import { CommunityMapper } from '@app/communities/communities/infrastructure/persistence/mappers/community.mapper';

@Injectable()
export class CommunitiesRepositoryAdapter
  extends RepositoryTypeORM<Community, CommunityEntity>
  implements CommunitiesRepositoryPort
{
  constructor(
    @InjectRepository(CommunityEntity)
    private readonly communityRepository: TypeOrmRepository<CommunityEntity>,
    private readonly communityMapper: CommunityMapper,
  ) {
    super(communityRepository, communityMapper);
  }

  async getAllCommunitiesSummary(): Promise<Either<ValidationError, Community[]>> {
    const communities = await this.communityRepository.find({
      select: ['id', 'name', 'description'],
    });

    const filtered = communities.map(e => this.communityMapper.fromPersistence(e));

    if (filtered.some(c => c.isLeft())) {
      const firstError = filtered.find(c => c.isLeft())!;
      return left(firstError.value);
    }

    return right(filtered.map(c => c.value as Community));
  }
}
