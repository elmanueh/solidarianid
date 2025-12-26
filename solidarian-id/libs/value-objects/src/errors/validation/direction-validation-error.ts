import { ValidationError } from './validation-error';

export class InvalidDirectionError extends ValidationError {
  constructor(message: string = 'The direction provided is invalid.') {
    super(message);
    this.name = 'InvalidDirectionError';
  }
}
