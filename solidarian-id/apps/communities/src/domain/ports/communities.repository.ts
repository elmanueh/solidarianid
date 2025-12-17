import { Repository } from '@app/ddd/repository';
import { CommunitySummary } from 'apps/communities/src/domain/model/entities/community-summary';

export abstract class CommunitiesRepository extends Repository<CommunitySummary> {
  abstract getAllCommunitiesSummary(): Promise<CommunitySummary[]>;
}
