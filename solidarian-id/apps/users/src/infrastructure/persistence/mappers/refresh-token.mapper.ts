import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { RefreshToken } from '@app/users/domain/model/refresh-token';
import { RefreshTokenEntity } from '@app/users/infrastructure/persistence/entities/refresh-token.entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenMapper implements Mapper<RefreshToken, RefreshTokenEntity> {
  toPersistence(model: RefreshToken): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.id = model.id.value;
    entity.userId = model.userId.value;
    entity.tokenHash = model.tokenHash;
    entity.expiresAt = model.expiresAt;
    entity.revokedAt = model.revokedAt;
    entity.rotatedAt = model.rotatedAt;

    return entity;
  }

  fromPersistence(entity: RefreshTokenEntity): Either<ValidationError, RefreshToken> {
    const userId = UniqueEntityID.create(entity.userId);
    if (userId.isLeft()) {
      return left(userId.value);
    }

    const refreshToken = RefreshToken.create(
      {
        userId: userId.value,
        tokenHash: entity.tokenHash,
        expiresAt: entity.expiresAt,
        revokedAt: entity.revokedAt,
        rotatedAt: entity.rotatedAt,
      },
      entity.id,
    );

    if (refreshToken.isLeft()) {
      return left(refreshToken.value);
    }

    return refreshToken;
  }
}
