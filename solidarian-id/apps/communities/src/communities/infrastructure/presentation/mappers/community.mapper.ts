import { Community } from '@app/communities/communities/domain/model/aggregates/community';
import { CommunitySummaryResponseDto } from '@app/communities/communities/infrastructure/presentation/dto/output/community-summary.response.dto';

export class CommunityMapper {
  static toCommunitySummaryDto(community: Community): CommunitySummaryResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    };
  }
}
