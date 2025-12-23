import { Mapper } from '@app/ddd/repository/mapper';
import { Administrator } from 'apps/admin/src/administrator/model/domain/model/administrator';
import { AdministratorEntity } from '../entities/administrator.entity';
import { Either, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { FullName } from '@app/value-objects/model/fullname';
import { UniqueEntityID } from '@app/value-objects/model/unique-entity-id';
import { Email } from '@app/value-objects/model/email';

export class AdministratorEntityMapper extends Mapper<
  Administrator,
  AdministratorEntity
> {
  toPersistence(model: Administrator): AdministratorEntity {
    const entity = new AdministratorEntity();
    entity._id = model.id.value;
    entity.fullname = model.fullname;
    entity.email = model.email;
    entity.phone = model.phone;
    entity.password = model.password;
    return entity;
  }
  fromPersistence(
    entity: AdministratorEntity,
  ): Either<ValidationError, Administrator> {
    const administratorOrError = Administrator.reconstitute(
      entity._id,
      entity.fullname,
      entity.email,
      entity.phone,
      entity.password,
    );

    if (administratorOrError.isLeft()) {
      return left(administratorOrError.value);
    }

    return administratorOrError;
  }
}
