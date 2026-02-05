import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { RequestEntity } from '../entities/request.entity';
import { UserEntityMapper } from './user-entity.mapper';
import { Request, RequestProps } from '@app/communities/domain/model/entities/request';

/**
 * Mapper for converting between Request domain entities and RequestEntity persistence entities.
 *
 * This mapper handles the conversion of Request entities to and from a single table structure.
 * The type field is used to discriminate between different request types (Community, Cause, Action).
 */
@Injectable()
export class RequestEntityMapper extends Mapper<Request<RequestProps>, RequestEntity> {
  constructor(private readonly userEntityMapper: UserEntityMapper) {
    super();
  }

  /**
   * Converts a Request domain entity to a RequestEntity persistence entity.
   *
   * @param model - The domain entity
   * @returns The persistence entity ready to be saved to the database
   */
  toPersistence(model: Request<RequestProps>): RequestEntity {
    const entity = new RequestEntity();

    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.reason = model.reason ?? '';
    entity.status = model.status;
    entity.type = model.type;
    entity.user = this.userEntityMapper.toPersistence(model.user);

    return entity;
  }

  /**
   * Converts a RequestEntity persistence entity to a Request domain entity.
   *
   * @param entity - The persistence entity from the database
   * @returns Either a ValidationError or the Request domain entity
   */
  fromPersistence(entity: RequestEntity): Either<ValidationError, Request<RequestProps>> {
    const userOrError = this.userEntityMapper.fromPersistence(entity.user);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const status = entity.status;

    return Request.create(
      {
        type: entity.type,
        name: entity.name,
        description: entity.description,
        status,
        reason: entity.reason || undefined,
        user: userOrError.value,
      },
      entity.id,
    );
  }
}
