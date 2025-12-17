import { Repository } from '@app/ddd/repository';
import { Community } from 'apps/communities/src/domain/model/aggregates/community';

export abstract class CommunitiesRepository extends Repository<Community> {
  abstract getAllCommunitiesSummary(): Promise<Community[]>;
}
