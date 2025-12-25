import { RequestCause } from '@app/admin/administrator/model/domain/models/cause.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { Either, left, right } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Description } from '@app/value-objects/model/description';
import { Duration } from '@app/value-objects/model/duration';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Injectable } from '@nestjs/common';

type DomainFactory = (
  e: RequestEntity,
  id: UniqueEntityID,
) => Either<ValidationError, Request<any>>;

@Injectable()
export class RequestMapper implements Mapper<Request<any>, RequestEntity> {
  private readonly factories: Record<RequestType, DomainFactory> = {
    [RequestType.CAUSE]: (e: CauseRequestEntity, id: UniqueEntityID) => {
      const descriptionOrError = Description.create(e.description);
      if (descriptionOrError.isLeft()) {
        return left(descriptionOrError.value);
      }
      const durationOrError = Duration.create(e.startDate, e.endDate);
      if (durationOrError.isLeft()) {
        return left(durationOrError.value);
      }

      const requestCause = RequestCause.create(
        {
          name: e.name,
          description: descriptionOrError.value,
          status: e.status,
          reason: e.reason,
          duration: durationOrError.value,
          ods: e.ods,
        },
        id,
      );

      return right(requestCause);
    },
    [RequestType.COMMUNITY]: (e, id: UniqueEntityID) => {
      return left(
        new ValidationError('Community request mapping not implemented yet'),
      );
    },
    [RequestType.ACTION]: (e, id: UniqueEntityID) => {
      return left(
        new ValidationError('Action request mapping not implemented yet'),
      );
    },
  };

  toPersistence(model: Request<any>): RequestEntity {
    const entity: Partial<RequestEntity> = {
      _id: model.id.value,
      name: model.name,
      description: model.description.value,
      status: model.status,
      reason: model.reason,
    };

    if (model instanceof RequestCause) {
      return {
        ...entity,
        type: RequestType.CAUSE,
        ods: model.ods,
        startDate: model.duration.startDate,
        endDate: model.duration.endDate,
      } as RequestEntity;
    }

    throw new Error(
      `Unsupported request type for model: ${model.constructor.name}`,
    );
  }

  fromPersistence(
    entity: RequestEntity,
  ): Either<ValidationError, Request<any>> {
    const idOrError = UniqueEntityID.create(entity._id);
    if (idOrError.isLeft()) {
      return left(idOrError.value);
    }

    const factory = this.factories[entity.type as RequestType];
    if (!factory) {
      return left(
        new ValidationError(`No factory found for request type ${entity.type}`),
      );
    }

    return factory(entity, idOrError.value);
  }
}
