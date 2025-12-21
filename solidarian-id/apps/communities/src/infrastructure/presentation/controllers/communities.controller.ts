import { Controller, Get } from '@nestjs/common';
import { CommunityMapper } from 'apps/communities/src/infrastructure/presentation/mappers/community.mapper';
import { CommunitiesService } from 'apps/communities/src/domain/services/communities.service';
import { CommunitySummaryResponseDto } from 'apps/communities/src/infrastructure/presentation/dto/output/community-summary.response.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getPublicCommunities(): Promise<CommunitySummaryResponseDto[]> {
    const communities = await this.communitiesService.getCommunities();

    if (communities.isLeft()) {
      throw communities.value;
    }

    const filtered = communities.value.map((community) =>
      CommunityMapper.toCommunitySummaryDto(community),
    );

    return filtered;
  }
}
