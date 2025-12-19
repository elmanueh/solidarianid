import { Community } from 'apps/communities/src/domain/model/entities/community';
import { CommunitySummaryDto } from 'apps/communities/src/infrastructure/presentation/dto/output/community-summary.dto';

export class CommunityMapper {
  static toCommunitySummaryDto(community: Community): CommunitySummaryDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    };
  }
}
