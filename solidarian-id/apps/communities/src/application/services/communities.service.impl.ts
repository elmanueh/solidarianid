import { Injectable } from '@nestjs/common';
import { Community } from 'apps/communities/src/domain/model/entities/community';
import { CommunitiesRepositoryPort } from 'apps/communities/src/domain/ports/communities.repository.port';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';

@Injectable()
export class CommunitiesServiceImpl extends CommunitiesService {
  constructor(private readonly communityRepository: CommunitiesRepositoryPort) {
    super();
  }

  async getCommunities(): Promise<Community[]> {
    const result = await this.communityRepository.getAllCommunitiesSummary();

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}
