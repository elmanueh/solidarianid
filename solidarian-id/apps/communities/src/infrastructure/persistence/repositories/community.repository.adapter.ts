import { Injectable } from '@nestjs/common';
import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';
import { CommunitiesRepository as CommunitiesRepositoryPort } from 'apps/communities/src/domain/ports/communities.repository';
import { AppDataSource } from 'apps/communities/src/infrastructure/persistence/data-source';
import { CommunityEntity } from 'apps/communities/src/infrastructure/persistence/entities/community.entity';
import { CommunityEntityMapper } from 'apps/communities/src/infrastructure/persistence/mappers/community.entity.mapper';

@Injectable()
export class CommunitiesRepositoryAdapter extends CommunitiesRepositoryPort {
  async getAllCommunitiesSummary(): Promise<CommunitySummary[]> {
    const repo = AppDataSource.getRepository(CommunityEntity);

    const communityEntities = await repo.find({
      select: ['id', 'name', 'description'],
    });

    const communities = communityEntities.map((entity) =>
      CommunityEntityMapper.toCommunitySummaryDomain(entity),
    );

    return communities;
  }

  // TODO: Implementar los metodos del repositorio (bajo demanda)
  save(obj: CommunitySummary): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<CommunitySummary> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
