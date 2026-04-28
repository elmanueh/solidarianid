import { CommunityLastUsersJoinedPeriodResponseDto } from '@app/admin/administrator/model/infrastructure/apis/dtos/community-last-users-joined-period.response.dto';
import { CommunityLastUsersJoinedSummaryResponseDto } from '@app/admin/administrator/model/infrastructure/apis/dtos/community-last-users-joined-summary.response.dto';
import { CommunityRankingUserResponseDto } from '@app/admin/administrator/model/infrastructure/apis/dtos/community-ranking-user.response.dto';
import { CauseDomainMapper } from '@app/communities/causes/infrastructure/presentation/controllers/rest/mappers/cause.mapper';
import { CommunityLastUsersJoinedData } from '@app/communities/communities/application/services/data/community-last-users-joined.data';
import { RankingCommunitiesByUsersData } from '@app/communities/communities/application/services/data/community-ranking.data';
import { ExploreCommunityData } from '@app/communities/communities/application/services/data/explore-community.data';
import { CommunityDetailResponseDto } from '@app/communities/communities/infrastructure/presentation/controllers/rest/dtos/output/community-detail.response.dto';
import { CommunitySummaryResponseDto } from '@app/communities/communities/infrastructure/presentation/controllers/rest/dtos/output/community-summary.response.dto';
import { ExploreCommunitiesResponseDto } from '@app/communities/communities/infrastructure/presentation/controllers/rest/dtos/output/explore-communities.response.dto';
import { ExploreCommunityItemResponseDto } from '@app/communities/communities/infrastructure/presentation/controllers/rest/dtos/output/explore-community-item.response.dto';
import { Community } from '@app/communities/shared/domain/model/aggregates/community';
import { ExplorePaginatedResultData } from '@app/communities/shared/domain/model/pagination/explore-paginated-result.data';

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
