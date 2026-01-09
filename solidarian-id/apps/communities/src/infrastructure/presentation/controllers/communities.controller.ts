import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';

import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CommunityDomainMapper } from '../mappers/community.mapper';
import { Community } from '@app/communities/domain/model/aggregates/community';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';
import { CommunityRankingUserResponseDto } from '../dtos/output/community-ranking-user.response.dto';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../dtos/output/community-last-users-joined-summary.response.dto';

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
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
  @ApiBadRequestResponse({ description: 'The provided ID is invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCommunityById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CommunityDetailResponseDto> {
    const community = await this.communitiesService.getCommunityById(id);

    if (community.isLeft()) {
      throw community.value;
    }

    return CommunityDomainMapper.toCommunityDetailDto(community.value);
  }

  @Get('ranking/most-users')
  @ApiOperation({ summary: 'Retrieve communities ranked by number of users' })
  @ApiOkResponse({
    description: 'List of communities ranked by user count',
    type: [CommunitySummaryResponseDto],
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'The request parameters are invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCommunitiesOrderByMostUsers(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<CommunityRankingUserResponseDto[]> {
    const communities = await this.communitiesService.getOrderByMostUsers(limit);
    if (communities.isLeft()) {
      throw communities.value;
    }

    return communities.value.map((community: RankingCommunitiesByUsersData) =>
      CommunityDomainMapper.toRankingCommunitiesByUsersDto(community),
    );
  }

  @Get(':id/users-joined')
  @ApiOperation({ summary: 'Retrieve the number of users who joined a community in the last months' })
  @ApiOkResponse({
    description: 'List of months with the number of users who joined',
    type: [Object],
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'The request parameters are invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getJoinedUsersLastMonths(
    @Param('id', new ParseUUIDPipe()) communityId: string,
    @Query('months', new ParseIntPipe({ optional: true })) months?: number,
  ): Promise<CommunityLastUsersJoinedSummaryResponseDto> {
    const joinedUsersData = await this.communitiesService.getJoinedUsersLastMonths(communityId, months);
    if (joinedUsersData.isLeft()) {
      throw joinedUsersData.value;
    }

    return CommunityDomainMapper.toCommunityLastUsersJoinedSummaryResponseDto(joinedUsersData.value);
  }
}
