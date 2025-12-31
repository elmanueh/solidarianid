import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from '../entities/community.entity';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitiesRepositoryPort } from '@app/communities/domain/ports/communities.repository.port';
import { CommunityEntityMapper } from '../mappers/community-entity.mapper';

@Injectable()
export class CommunitiesRepositoryTypeORM
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
}
