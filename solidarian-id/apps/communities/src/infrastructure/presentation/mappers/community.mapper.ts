import { CommunitySummaryDto } from 'apps/communities/src/infrastructure/presentation/dto/out/community.summay.dto';
import { Community } from 'apps/communities/src/domain/model/entities/community';

export class CommunityMapper {
  static toCommunitySummaryDto(community: Community): CommunitySummaryDto {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    };
  }
}
