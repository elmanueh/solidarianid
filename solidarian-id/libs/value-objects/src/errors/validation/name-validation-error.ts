import { ValidationError } from './validation-error';

export class InvalidNameError extends ValidationError {
  constructor(message: string = 'The name provided is invalid') {
    super(message);
    this.name = 'InvalidNameError';
  }
}
