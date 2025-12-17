import { Controller, Get } from '@nestjs/common';
import { CommunitySummaryDto } from 'apps/communities/src/application/dto/out/community.summay.dto';
import { CommunityMapper } from 'apps/communities/src/application/mappers/community.mapper';
import { CommunitiesService } from 'apps/communities/src/domain/ports/communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getPublicCommunities(): Promise<CommunitySummaryDto[]> {
    const communities = await this.communitiesService.getCommunities();
    const communityDtos = communities.map((community) =>
      CommunityMapper.toCommunityDto(community),
    );
    return communityDtos;
  }
}
