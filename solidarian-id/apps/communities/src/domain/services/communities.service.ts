import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';

export abstract class CommunitiesService {
  abstract getCommunities(): Promise<CommunitySummary[]>;
}
