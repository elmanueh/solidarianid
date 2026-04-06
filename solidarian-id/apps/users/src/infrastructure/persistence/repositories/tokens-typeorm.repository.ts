import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryTypeORM } from '@app/ddd/repository/repository-typeorm';
import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { TokensRepositoryPort } from '@app/users/domain/ports/tokens.repository.port';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { RefreshTokenMapper } from '@app/users/infrastructure/persistence/mappers/refresh-token.mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class TokensTypeormRepository
  extends RepositoryTypeORM<RefreshToken, RefreshTokenEntity>
  implements TokensRepositoryPort
{
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly tokensRepository: TypeOrmRepository<RefreshTokenEntity>,
    private readonly tokenMapper: RefreshTokenMapper,
  ) {
    super(tokensRepository, tokenMapper);
  }

  async findByUserId(userId: UniqueEntityID): Promise<Either<RepositoryException | ValidationError, RefreshToken>> {
    try {
      const entity = await this.tokensRepository.findOne({
        where: { userId: userId.value },
      });

      if (!entity) {
        return left(new EntityNotFoundException('RefreshToken', userId.value));
      }

      const refreshToken = this.tokenMapper.fromPersistence(entity);
      if (refreshToken.isLeft()) {
        return left(refreshToken.value);
      }

      return right(refreshToken.value);
    } catch (error) {
      return left(new RepositoryException(`Failed to find refresh token by userId: ${userId.value}`, error));
    }
  }
}
