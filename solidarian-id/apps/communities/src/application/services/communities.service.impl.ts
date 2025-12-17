import { Injectable } from '@nestjs/common';
import { Community } from 'apps/communities/src/domain/model/aggregates/community';
import { CommunitiesRepository } from 'apps/communities/src/domain/ports/communities.repository';
import { CommunitiesService } from 'apps/communities/src/domain/ports/communities.service';

@Injectable()
export class CommunitiesServiceImpl extends CommunitiesService {
  constructor(private communityRepository: CommunitiesRepository) {
    super();
  }

  getCommunities(): Promise<Community[]> {
    return this.communityRepository.getAllCommunitiesSummary();
  }
}
