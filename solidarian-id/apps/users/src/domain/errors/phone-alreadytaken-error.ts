import { DomainError } from '@app/ddd/domain-error';

export class MobilePhoneAlreadyTakenError extends DomainError {
  constructor(
    message: string = 'The provided Mobile Phone is already asigned to other account.',
  ) {
    super(message);
    this.name = 'InvalidCityError';
  }
}
