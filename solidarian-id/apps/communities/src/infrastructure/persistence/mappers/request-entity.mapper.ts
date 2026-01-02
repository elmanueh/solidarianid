import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { RequestEntity } from '../entities/request.entity';
import { UserEntityMapper } from './user-entity.mapper';
import { AnyRequest } from '@app/communities/domain/ports/requests.repository.port';
import { CommunityRequest } from '@app/communities/domain/model/entities/request-community';
import { CauseRequest } from '@app/communities/domain/model/entities/request-cause';
import { ActionRequest } from '@app/communities/domain/model/entities/request-action';
import { RequestType } from '@app/communities/domain/model/enums/request-type';
import { RequestStatus } from '@app/communities/domain/model/enums/request-status';
import { User } from '@app/communities/domain/model/entities/user';

/**
 * Mapper for converting between Request domain entities and RequestEntity persistence entities.
 *
 * This mapper implements the Single Table Inheritance pattern, handling the conversion
 * of different request types (Community, Cause, Action) to and from a single table structure.
 *
 * Note: Specific fields for each request type (ods, objectives, events, etc.) are NOT persisted
 * in the database. Only the base fields common to all request types are stored.
 */
@Injectable()
export class RequestEntityMapper extends Mapper<AnyRequest, RequestEntity> {
  constructor(private readonly userEntityMapper: UserEntityMapper) {
    super();
  }

  /**
   * Converts a Request domain entity to a RequestEntity persistence entity.
   *
   * @param model - The domain entity (CommunityRequest, CauseRequest, or ActionRequest)
   * @returns The persistence entity ready to be saved to the database
   */
  toPersistence(model: AnyRequest): RequestEntity {
    const entity = new RequestEntity();

    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.reason = model.reason ?? '';
    entity.status = model.status;

    // Determine the type based on the domain entity instance
    if (model instanceof CommunityRequest) {
      entity.type = RequestType.COMMUNITY;
    } else if (model instanceof CauseRequest) {
      entity.type = RequestType.CAUSE;
    } else if (model instanceof ActionRequest) {
      entity.type = RequestType.ACTION;
    }

    entity.user = this.userEntityMapper.toPersistence(model.user);

    return entity;
  }

  /**
   * Converts a RequestEntity persistence entity to the appropriate Request domain entity.
   *
   * @param entity - The persistence entity from the database
   * @returns Either a ValidationError or the corresponding domain entity
   */
  fromPersistence(entity: RequestEntity): Either<ValidationError, AnyRequest> {
    const userOrError = this.userEntityMapper.fromPersistence(entity.user);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;
    const status = entity.status as RequestStatus;
    const reason = entity.reason || undefined;

    switch (entity.type) {
      case RequestType.COMMUNITY:
        return this.mapToCommunityRequest(entity, user, status, reason);

      case RequestType.CAUSE:
        return this.mapToCauseRequest(entity, user, status, reason);

      case RequestType.ACTION:
        return this.mapToActionRequest(entity, user, status, reason);

      default:
        return left(new ValidationError(`Unknown request type: ${String(entity.type)}`));
    }
  }

  /**
   * Maps a persistence entity to a CommunityRequest domain entity.
   */
  private mapToCommunityRequest(
    entity: RequestEntity,
    user: User,
    status: RequestStatus,
    reason: string | undefined,
  ): Either<ValidationError, CommunityRequest> {
    return CommunityRequest.create(
      {
        name: entity.name,
        description: entity.description,
        status,
        reason,
        user,
        causeCreationRequests: [], // Not persisted in this table
      },
      entity.id,
    );
  }

  /**
   * Maps a persistence entity to a CauseRequest domain entity.
   */
  private mapToCauseRequest(
    entity: RequestEntity,
    user: User,
    status: RequestStatus,
    reason: string | undefined,
  ): Either<ValidationError, CauseRequest> {
    return CauseRequest.create(
      {
        name: entity.name,
        description: entity.description,
        status,
        reason,
        user,
        ods: [], // Not persisted in this table
        initialDate: new Date(), // Not persisted in this table
        durationDays: 1, // Not persisted in this table
      },
      entity.id,
    );
  }

  /**
   * Maps a persistence entity to an ActionRequest domain entity.
   */
  private mapToActionRequest(
    entity: RequestEntity,
    user: User,
    status: RequestStatus,
    reason: string | undefined,
  ): Either<ValidationError, ActionRequest> {
    return ActionRequest.create(
      {
        name: entity.name,
        description: entity.description,
        status,
        reason,
        user,
        objectives: [], // Not persisted in this table
        events: [], // Not persisted in this table
      },
      entity.id,
    );
  }
}
