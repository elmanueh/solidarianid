import { ValidationError } from './validation-error';

export class InvalidMobilePhoneError extends ValidationError {
  constructor(
    message: string = 'The mobile phone number provided is invalid. It must be in E.164 format (e.g., +34612345678).',
  ) {
    super(message);
    this.name = 'InvalidMobilePhoneError';
  }
}
