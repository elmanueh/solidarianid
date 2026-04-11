import { DomainEvent } from '@app/ddd/domain-event';
import { Either, left, right } from '@app/ddd/either';
import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { RepositoryKurrentDb } from '@app/ddd/repository/repository-kurrentdb';
import { User } from '@app/users/domain/model/user';
import { UsersRepositoryPort } from '@app/users/domain/ports/users.repository.port';
import { UsersProjectionRepository } from '@app/users/infrastructure/persistence/repositories/users.projection.repository';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { FORWARDS, KurrentDBClient, START, StreamNotFoundError } from '@kurrent/kurrentdb-client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepositoryKurrentDb extends RepositoryKurrentDb<User> implements UsersRepositoryPort {
  constructor(
    @Inject('EVENT_STORE') eventStore: KurrentDBClient,
    private readonly usersRepository: UsersProjectionRepository,
  ) {
    super(eventStore);
  }

  override streamName(modelId: string): string {
    return `user-${modelId}`;
  }

  override async findById(id: string): Promise<Either<RepositoryException | EntityNotFoundException, User>> {
    const userOrError = User.create(
      {
        fullName: 'rehydrating',
        username: 'rehydrating',
        mobilePhone: '+34000000000',
        passwordHash: 'rehydratingRehydrating',
        city: 'rehydrating',
        countryCode: 'ES',
      },
      id,
    );

    if (userOrError.isLeft()) {
      return left(
        new RepositoryException(`Failed to create user instance for rehydration: ${userOrError.value.message}`),
      );
    }

    const user = userOrError.value;
    user.pullDomainEvents();

    try {
      const stream = this.streamName(id);
      const events = this.eventStore.readStream(stream, {
        direction: FORWARDS,
        fromRevision: START,
      });

      for await (const { event } of events) {
        const payload = event?.data as unknown as DomainEvent;
        user.applyEvent(payload);
      }

      return right(user);
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return left(new EntityNotFoundException('User', `User with ID ${id} not found`));
      } else return left(new RepositoryException(`Failed to find user by id ${id}: ${error}`));
    }
  }

  async existsByMobilePhone(
    mobilePhone: string,
    excludeUserId?: string,
  ): Promise<Either<RepositoryException, boolean>> {
    try {
      const userProjectionOrError = await this.usersRepository.findOne({ mobilePhone });
      if (userProjectionOrError.isLeft()) {
        if (userProjectionOrError.value instanceof EntityNotFoundException) {
          return right(false);
        }

        return left(userProjectionOrError.value);
      }

      const userProjection = userProjectionOrError.value;
      return right(userProjection.id !== excludeUserId);
    } catch (error) {
      return left(new RepositoryException(`Failed to check if mobile phone exists: ${error}`));
    }
  }

  async existsByUsername(username: string, excludeUserId?: string): Promise<Either<RepositoryException, boolean>> {
    try {
      const userProjectionOrError = await this.usersRepository.findOne({ username });
      if (userProjectionOrError.isLeft()) {
        if (userProjectionOrError.value instanceof EntityNotFoundException) {
          return right(false);
        }

        return left(userProjectionOrError.value);
      }

      const userProjection = userProjectionOrError.value;
      return right(userProjection.id !== excludeUserId);
    } catch (error) {
      return left(new RepositoryException(`Failed to check if username exists: ${error}`));
    }
  }

  async findByUsername(username: string): Promise<Either<RepositoryException | ValidationError, User>> {
    try {
      const userProjectionOrError = await this.usersRepository.findOne({ username });
      if (userProjectionOrError.isLeft()) {
        return left(userProjectionOrError.value);
      }

      const userProjection = userProjectionOrError.value;
      const userOrError = await this.findById(userProjection.id);

      if (userOrError.isLeft()) {
        const error = userOrError.value;
        if (error instanceof EntityNotFoundException) {
          return left(new ValidationError(`User with username ${username} not found`));
        }

        return left(new RepositoryException(`Failed to find user by username: ${error}`));
      }

      return right(userOrError.value);
    } catch (error) {
      return left(new RepositoryException(`Failed to find user by username: ${error}`));
    }
  }
}
