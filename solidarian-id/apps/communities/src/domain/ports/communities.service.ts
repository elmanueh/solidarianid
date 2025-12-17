import { Community } from 'apps/communities/src/domain/model/aggregates/community';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Community[]>;
}
