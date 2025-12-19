import { Community } from 'apps/communities/src/domain/model/entities/community';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<Community[]>;
}
