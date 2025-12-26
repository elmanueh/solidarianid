import { ValidationError } from './validation-error';

export class InvalidUnitError extends ValidationError {
  constructor(message: string = 'The unit provided is invalid') {
    super(message);
    this.name = 'InvalidUnitError';
  }
}
