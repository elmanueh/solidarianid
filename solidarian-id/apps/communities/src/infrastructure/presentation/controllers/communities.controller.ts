import { Controller, Get } from '@nestjs/common';
import { CommunityMapper } from 'apps/communities/src/infrastructure/presentation/mappers/community.mapper';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';
import { CommunitySummaryDto } from 'apps/communities/src/infrastructure/presentation/dto/output/community-summary.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getPublicCommunities(): Promise<CommunitySummaryDto[]> {
    const communities = await this.communitiesService.getCommunities();
    const communityDtos = communities.map((community) =>
      CommunityMapper.toCommunitySummaryDto(community),
    );
    return communityDtos;
  }
}
