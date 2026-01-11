import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';
import { CauseDomainMapper } from './cause.mapper';
import { CommunityRankingUserResponseDto } from '../dtos/output/community-ranking-user.response.dto';
import { RankingCommunitiesByUsersData } from '@app/communities/application/services/community-ranking.data';
import { CommunityLastUsersJoinedData } from '@app/communities/application/services/community-last-users-joined.data';
import { CommunityLastUsersJoinedSummaryResponseDto } from '../dtos/output/community-last-users-joined-summary.response.dto';
import { CommunityLastUsersJoinedPeriodResponseDto } from '../dtos/output/community-last-users-joined-period.response.dto';

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
      causes: community.causes.map(cause => CauseDomainMapper.toCauseSummaryDto(cause)),
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
      communityName: communityData[0].communityName,
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
