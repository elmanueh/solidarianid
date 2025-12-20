import { ValidationError } from './validation-error';

export class InvalidDescriptionError extends ValidationError {
  constructor(message: string = 'The description provided is invalid.') {
    super(message);
    this.name = 'InvalidDescriptionError';
  }
}
