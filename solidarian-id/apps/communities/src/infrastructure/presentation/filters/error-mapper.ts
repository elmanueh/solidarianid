import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ErrorMapper {
  static toHttp(error: Error) {
    if (error instanceof EntityNotFoundException) {
      return new NotFoundException(error.message);
    }

    if (error instanceof ValidationError) {
      return new BadRequestException(error.message);
    }

    if (error.name === 'DomainConflictError') {
      return new ConflictException(error.message);
    }

    return new InternalServerErrorException(error.message);
  }
}
