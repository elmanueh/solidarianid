import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';

import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CommunityDomainMapper } from '../mappers/community.mapper';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all charitable communities' })
  @ApiOkResponse({
    description: 'List of communities',
    type: [CommunitySummaryResponseDto],
    isArray: true,
  })
  async getCommunities(): Promise<CommunitySummaryResponseDto[]> {
    const communities = await this.communitiesService.getCommunities();

    if (communities.isLeft()) {
      throw communities.value;
    }

    return communities.value.map((community: Community) => CommunityDomainMapper.toCommunitySummaryDto(community));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a charitable community by ID' })
  @ApiOkResponse({
    description: 'Community details',
    type: CommunityDetailResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Community not found' })
  async getCommunityById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CommunityDetailResponseDto> {
    const community = await this.communitiesService.getCommunityById(id);

    if (community.isLeft()) {
      throw community.value;
    }

    return CommunityDomainMapper.toCommunityDetailDto(community.value);
  }
}
