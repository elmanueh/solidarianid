import { Community } from '@app/communities/domain/model/aggregates/community';
import { CommunitySummaryResponseDto } from '../dtos/output/community-summary.response.dto';
import { CommunityDetailResponseDto } from '../dtos/output/community-detail.response.dto';
import { CauseDomainMapper } from './cause.mapper';

export class CommunityDomainMapper {
  static toCommunitySummaryDto(community: Community): CommunitySummaryResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
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
}
