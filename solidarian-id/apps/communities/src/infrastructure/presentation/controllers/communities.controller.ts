// istanbul ignore next
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';

import { CommunitiesService } from '@app/communities/domain/services/communities.service';
import { CommunityDomainMapper } from '../mappers/community.mapper';
import { Community } from '@app/communities/domain/model/aggregates/community';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';
import { CommunityRankingUserResponseDto } from '../dtos/output/community-ranking-user.response.dto';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../dtos/output/community-last-users-joined-summary.response.dto';
import { MemberJoinCommunityRequestDto } from '../dtos/input/member-join-community.request.dto';

@Controller('communities')
// istanbul ignore next
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  //TODO : Borrar este endpoint y sustituirlo por grpc
  @Get()
  @ApiOperation({ summary: 'Retrieve all charitable communities' })
  @ApiQuery({
    name: 'criteria',
    required: false,
    enum: ['most-users'],
    description: 'Criteria to filter communities. If "most-users", returns communities ranked by user count.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of communities to return (only applies when criteria is "most-users")',
  })
  @ApiOkResponse({
    description: 'List of communities (default)',
    type: [CommunitySummaryResponseDto],
    isArray: true,
  })
  @ApiOkResponse({
    description: 'List of communities ranked by user count (when criteria=most-users)',
    type: [CommunityRankingUserResponseDto],
    isArray: true,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getCommunities(
    @Query('criteria') criteria?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<CommunitySummaryResponseDto[] | CommunityRankingUserResponseDto[]> {
    if (criteria === 'most-users') {
      return await this.getCommunitiesOrderByMostUsers(limit);
    }

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

  async getCommunitiesOrderByMostUsers(limit?: number): Promise<CommunityRankingUserResponseDto[]> {
    const communities = await this.communitiesService.getOrderByMostUsers(limit);
    if (communities.isLeft()) {
      throw communities.value;
    }

    return communities.value.map((community: RankingCommunitiesByUsersData) =>
      CommunityDomainMapper.toRankingCommunitiesByUsersDto(community),
    );
  }


  //TODO : Borrar este endpoint y sustituirlo por grpc
  @Get(':id/users')
  @ApiOperation({ summary: 'Retrieve the number of users who joined a community in the last months' })
  @ApiOkResponse({
    description: 'Summary of users joined per month',
    type: CommunityLastUsersJoinedSummaryResponseDto,
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

  @Post(':id/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Join a user to a community' })
  @ApiCreatedResponse({
    description: 'User successfully joined the community',
  })
  @ApiBadRequestResponse({ description: 'The request parameters are invalid' })
  @ApiConflictResponse({ description: 'User is already a member of the community' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async joinCommunity(
    @Param('id', new ParseUUIDPipe()) communityId: string,
    @Body() dto: MemberJoinCommunityRequestDto,
  ): Promise<void> {
    const result = await this.communitiesService.joinCommunity(communityId, dto.userId);

    if (result.isLeft()) {
      throw result.value;
    }
    return undefined;
  }
}
