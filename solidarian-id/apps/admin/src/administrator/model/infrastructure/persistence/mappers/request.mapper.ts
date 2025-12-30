import { RequestCause } from '@app/admin/administrator/model/domain/models/cause.request';
import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

type DomainFactory = (
  e: RequestEntity,
) => Either<ValidationError, Request<any>>;

@Injectable()
export class RequestMapper implements Mapper<Request<any>, RequestEntity> {
  private readonly factories: Record<RequestType, DomainFactory> = {
    [RequestType.CAUSE]: (e: CauseRequestEntity) => {
      return RequestCause.create(
        {
          name: e.name,
          description: e.description,
          status: e.status,
          reason: e.reason,
          startDate: e.startDate,
          endDate: e.endDate,
          ods: e.ods,
        },
        e._id,
      );
    },
    // ! QUITAR LA LINEA INFERIOR CUANDO SE IMPLEMENTE
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [RequestType.COMMUNITY]: (e) => {
      return left(
        new ValidationError('Community request mapping not implemented yet'),
      );
    },
    // ! QUITAR LA LINEA INFERIOR CUANDO SE IMPLEMENTE
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [RequestType.ACTION]: (e) => {
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
    const factory = this.factories[entity.type as RequestType];
    if (!factory) {
      return left(
        new ValidationError(`No factory found for request type ${entity.type}`),
      );
    }

    return factory(entity);
  }
}
