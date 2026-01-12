import { EntityNotFoundException } from '@app/ddd/repository/exceptions/entity-not-found.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConflictError } from '@app/ddd/errors/conflict-error';
import { AuthError } from '@app/ddd/errors/auth-error';
import { DomainError } from '@app/ddd/errors/domain-error';

export class ErrorMapper {
  static toHttp(error: Error) {
    if (error instanceof EntityNotFoundException) {
      return new NotFoundException(error.message);
    }

    if (error instanceof ConflictError) {
      return new ConflictException(error.message);
    }

    if (error instanceof AuthError) {
      return new UnauthorizedException(error.message);
    }

    if (error instanceof ValidationError || error instanceof DomainError) {
      return new BadRequestException(error.message);
    }

    return new InternalServerErrorException(error.message);
  }
}
