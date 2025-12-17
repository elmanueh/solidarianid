import { Injectable } from '@nestjs/common';
import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';

@Injectable()
export class CommunitiesServiceImpl extends CommunitiesService {
  constructor(private readonly communityRepository: CommunitiesRepository) {
    super();
  }

  getCommunities(): Promise<CommunitySummary[]> {
    return this.communityRepository.getAllCommunitiesSummary();
  }
}
