import { CommunitySummaryDto } from 'apps/communities/src/infrastructure/presentation/dto/out/community.summay.dto';
import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';

export class CommunityMapper {
  static toCommunitySummaryDto(
    community: CommunitySummary,
  ): CommunitySummaryDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    };
  }
}
