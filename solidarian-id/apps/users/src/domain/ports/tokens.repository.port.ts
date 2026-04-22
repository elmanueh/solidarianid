import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { Repository } from '@app/ddd/repository/repository';
import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export abstract class TokensRepositoryPort extends Repository<RefreshToken> {
  abstract findByJti(jti: UniqueEntityID): Promise<Either<RepositoryException | ValidationError, RefreshToken>>;
}
