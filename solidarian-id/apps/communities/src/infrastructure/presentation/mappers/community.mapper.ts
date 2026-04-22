import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { ExploreCommunityData } from '@app/communities/application/services/explore-community.data';
import { ExplorePaginatedResultData } from '@app/communities/application/services/explore-paginated-result.data';
import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';
import { CommunityLastUsersJoinedPeriodResponseDto } from '../dtos/output/community-last-users-joined-period.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../dtos/output/community-last-users-joined-summary.response.dto';
import { CommunityRankingUserResponseDto } from '../dtos/output/community-ranking-user.response.dto';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';
import { ExploreCommunitiesResponseDto } from '../dtos/output/explore-communities.response.dto';
import { ExploreCommunityItemResponseDto } from '../dtos/output/explore-community-item.response.dto';
import { CauseDomainMapper } from './cause.mapper';

export class CommunityDomainMapper {
  static toCommunitySummaryDto(community: Community): CommunitySummaryResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
      creatorId: community.creator.id.value,
    };
  }

  static toCommunityDetailDto(community: Community): CommunityDetailResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
      creatorId: community.creator.id.value,
      causes: community.causes.map(cause => CauseDomainMapper.toCauseSummaryDto(cause)),
    };
  }

  static toExploreCommunityItemDto(community: ExploreCommunityData): ExploreCommunityItemResponseDto {
    return {
      id: community.id,
      name: community.name,
      description: community.description,
    };
  }

  static toExploreCommunitiesResponseDto(
    result: ExplorePaginatedResultData<ExploreCommunityData>,
  ): ExploreCommunitiesResponseDto {
    return {
      items: result.items.map(community => this.toExploreCommunityItemDto(community)),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };
  }

  static toRankingCommunitiesByUsersDto(communityData: RankingCommunitiesByUsersData): CommunityRankingUserResponseDto {
    return {
      id: communityData.communityId,
      name: communityData.communityName,
      userCount: communityData.userCount,
    };
  }

  static toCommunityLastUsersJoinedSummaryResponseDto(
    communityData: CommunityLastUsersJoinedData[],
  ): CommunityLastUsersJoinedSummaryResponseDto {
    return {
      communityName: communityData[0]?.communityName ?? '',
      dataRange: communityData.map(data => this.toCommunityLastUsersJoinedPeriodResponseDto(data)),
    };
  }

  static toCommunityLastUsersJoinedPeriodResponseDto(
    data: CommunityLastUsersJoinedData,
  ): CommunityLastUsersJoinedPeriodResponseDto {
    return {
      month: data.month,
      userCount: data.userCount,
    };
  }
}
