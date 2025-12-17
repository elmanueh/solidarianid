import { CommunitySummaryDto } from "apps/communities/src/application/dto/out/community.summay.dto";
import { Community } from "apps/communities/src/domain/model/aggregates/community";

export class CommunityMapper {
    static toCommunityDto(community: Community): CommunitySummaryDto {
        return {
            id: community.id.value,
            name: community.name,
            description: community.description,
        };
    }
}