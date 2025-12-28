import { ValidationError } from '@app/value-objects/errors/validation/validation-error';

export class InvalidDurationError extends ValidationError {
  constructor(message: string = 'The duration provided is invalid.') {
    super(message);
    this.name = InvalidDurationError.name;
  }
}
