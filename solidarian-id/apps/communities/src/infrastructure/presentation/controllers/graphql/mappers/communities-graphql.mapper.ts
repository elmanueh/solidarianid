import { Community } from '@app/communities/domain/model/aggregates/community';
import { Injectable } from '@nestjs/common';
import { Community as CommunityGraphql } from '../entities/community';

@Injectable()
export class CommunitiesGraphqlMapper {
  toCommunityBase(community: Community): CommunityGraphql {
    return {
      id: community.id.value,
      name: community.name,
      description: community.description,
    } as CommunityGraphql;
  }
}
