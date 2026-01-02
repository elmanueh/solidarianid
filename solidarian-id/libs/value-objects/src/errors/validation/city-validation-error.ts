import { ValidationError } from './validation-error';

export class InvalidCityError extends ValidationError {
  constructor(message: string = 'The city name provided is invalid. It must be between 1 and 25 characters.') {
    super(message);
    this.name = 'InvalidCityError';
  }
}
