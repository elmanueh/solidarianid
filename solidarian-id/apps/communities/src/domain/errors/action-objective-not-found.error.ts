import { DomainError } from '@app/ddd/errors/domain-error';

export class ActionObjectiveNotFoundError extends DomainError {
  constructor(objectiveName: string, actionId: string) {
    super(`Objective ${objectiveName} was not found in action ${actionId}.`);
    this.name = ActionObjectiveNotFoundError.name;
  }
}
