import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { CauseGroupByOdsData } from '../../../application/services/data/cause-group-by-ods.data';

export abstract class RequestsQueryRepositoryPort {
  abstract findCausesGroupByOds(): Promise<Either<RepositoryException, CauseGroupByOdsData[]>>;
}
