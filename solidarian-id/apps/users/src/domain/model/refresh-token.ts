import { Either, left, right } from '@app/ddd/either';
import { Entity } from '@app/ddd/entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';

export interface RefreshTokenProps {
  userId: UniqueEntityID;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  refreshedAt: Date | null;
  deviceId: string | null;
}

export class RefreshToken extends Entity<RefreshTokenProps> {
  private constructor(props: RefreshTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get tokenHash(): string {
    return this.props.tokenHash;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get revokedAt(): Date | null {
    return this.props.revokedAt;
  }

  get refreshedAt(): Date | null {
    return this.props.refreshedAt;
  }

  get deviceId(): string | null {
    return this.props.deviceId;
  }

  isActive(now: Date = new Date()): boolean {
    return !this.props.revokedAt && this.props.expiresAt.getTime() > now.getTime();
  }

  touchRefreshedAt(at: Date = new Date()): void {
    this.props.refreshedAt = at;
  }

  setTokenHash(tokenHash: string): Either<ValidationError, void> {
    if (!tokenHash.trim()) {
      return left(new ValidationError('Refresh token hash cannot be empty'));
    }

    this.props.tokenHash = tokenHash;
    return right(undefined);
  }

  revoke(at: Date = new Date()): void {
    this.props.revokedAt = at;
  }

  matchesHash(tokenHash: string): boolean {
    return this.props.tokenHash === tokenHash;
  }

  static create(props: RefreshTokenProps, id?: string): Either<ValidationError, RefreshToken> {
    if (!props.tokenHash.trim()) {
      return left(new ValidationError('Refresh token hash cannot be empty'));
    }

    if (props.expiresAt.getTime() <= 0) {
      return left(new ValidationError('Refresh token expiresAt must be a valid date'));
    }

    let entityId: UniqueEntityID | undefined;
    if (id) {
      const idResult = UniqueEntityID.create(id);
      if (idResult.isLeft()) {
        return left(idResult.value);
      }

      entityId = idResult.value;
    }

    return right(
      new RefreshToken(
        {
          userId: props.userId,
          tokenHash: props.tokenHash,
          expiresAt: props.expiresAt,
          revokedAt: props.revokedAt,
          refreshedAt: props.refreshedAt,
          deviceId: props.deviceId,
        },
        entityId,
      ),
    );
  }
}
