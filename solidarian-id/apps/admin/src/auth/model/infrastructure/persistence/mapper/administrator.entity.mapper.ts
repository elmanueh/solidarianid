import { Mapper } from '@app/ddd/repository/mapper';
import { Either, left } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Administrator } from '@app/admin/administrator/model/domain/models/administrator';
import { AdministratorEntity } from '@app/admin/auth/model/infrastructure/persistence/entities/administrator.entity';

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
