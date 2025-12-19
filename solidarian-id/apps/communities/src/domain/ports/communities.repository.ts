import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { Community } from 'apps/communities/src/domain/model/entities/community';

export abstract class CommunitiesRepository extends Repository<Community> {
  abstract getAllCommunitiesSummary(): Promise<
    Either<RepositoryException, Community[]>
  >;
}
