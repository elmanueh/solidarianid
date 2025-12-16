import { ValidationError } from './validation-error';

export class InvalidFullNameError extends ValidationError {
  constructor(
    message: string = 'The full name provided is invalid. It must contain at least a first name and first surname.',
  ) {
    super(message);
    this.name = 'InvalidFullNameError';
  }
}
