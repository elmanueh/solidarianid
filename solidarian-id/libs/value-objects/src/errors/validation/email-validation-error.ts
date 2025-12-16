import { ValidationError } from './validation-error';

export class InvalidEmailError extends ValidationError {
  constructor(
    message: string = 'An email must contain a user name and a domain name, separated by the @ character.',
  ) {
    super(message);
    this.name = 'AddressValidationError';
  }
}
