import { Community } from 'apps/communities/src/domain/model/entities/community';
import { CommunitySummaryResponseDto } from 'apps/communities/src/infrastructure/presentation/dto/output/community-summary.response.dto';

export class CommunityMapper {
  static toCommunitySummaryDto(
    community: Community,
  ): CommunitySummaryResponseDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    };
  }
}
