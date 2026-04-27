import { ExploreCauseData } from '@app/communities/application/services/data/explore-cause.data';
import { ExploreCausesCriteria } from '@app/communities/application/services/data/explore-causes.criteria';
import { ExplorePaginatedResultData } from '@app/communities/application/services/data/explore-paginated-result.data';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class CausesQueryRepositoryPort {
  abstract findExplore(
    criteria: ExploreCausesCriteria,
  ): Promise<Either<RepositoryException, ExplorePaginatedResultData<ExploreCauseData>>>;
}
