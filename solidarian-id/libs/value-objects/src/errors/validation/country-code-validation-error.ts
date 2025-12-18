import { ValidationError } from './validation-error';

export class InvalidCountryCodeError extends ValidationError {
  constructor(
    message: string = 'The country code provided is invalid. It must be a valid ISO 3166-1 alpha-2 code (e.g., ES, US).',
  ) {
    super(message);
    this.name = 'InvalidCountryCodeError';
  }
}
