import { Repository } from '@app/ddd/repository/repository';
import { Community } from '../model/aggregates/community';

export abstract class CommunitiesRepositoryPort extends Repository<Community> {}
