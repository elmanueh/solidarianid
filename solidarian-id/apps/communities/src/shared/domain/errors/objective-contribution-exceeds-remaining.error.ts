import { DomainError } from '@app/ddd/errors/domain-error';

export class ObjectiveContributionExceedsRemainingError extends DomainError {
  constructor(amount: number, remaining: number) {
    super(`Cannot contribute ${amount}. Remaining amount is ${remaining}.`);
    this.name = ObjectiveContributionExceedsRemainingError.name;
  }
}
