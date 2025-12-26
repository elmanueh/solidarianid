import { ValidationError } from './validation-error';

export class InvalidQuantityError extends ValidationError {
  constructor(message: string = 'The quantity provided is invalid') {
    super(message);
    this.name = 'InvalidQuantityError';
  }
}
