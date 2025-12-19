import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'apps/communities/src/domain/model/entities/community';
import { CommunitiesRepositoryPort as CommunitiesRepositoryPort } from 'apps/communities/src/domain/ports/communities.repository.port';
import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';
import { CommunityMapper } from 'apps/communities/src/infrastructure/persistence/mappers/community.mapper';

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

  async getAllCommunitiesSummary(): Promise<
    Either<RepositoryException, Community[]>
  > {
    const communities = await this.communityRepository.find({
      select: ['id', 'name', 'description'],
    });

    const filtered = communities.map((e) =>
      this.communityMapper.fromPersistence(e),
    );

    if (filtered.some((c) => c.isLeft())) {
      const firstError = filtered.find((c) => c.isLeft())!;
      return left(firstError.value);
    }

    return right(filtered.map((c) => c.value as Community));
  }
}
