import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';

export abstract class EventsRepositoryPort {
  abstract findAllEventIdsByUserId(userId: string): Promise<Either<RepositoryException, string[]>>;
}
