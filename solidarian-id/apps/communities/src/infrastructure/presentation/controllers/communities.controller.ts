import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { Controller, Get } from '@nestjs/common';
import { CommunitySummaryResponseDto } from '../dto/output/community-summary.response.dto';
import { CommunityMapper } from '../mappers/community.mapper';

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
