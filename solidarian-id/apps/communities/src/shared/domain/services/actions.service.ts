import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { Objective } from '@app/communities/shared/domain/model/value-objects/objective';
import { Either } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { ActionRequestEventDto } from '@solidarianid/kafka';

export abstract class ActionsService {
  abstract getActions(): Promise<Either<ValidationError, Action[]>>;
  abstract getActionById(id: string): Promise<Either<ValidationError, Action>>;
  abstract getByCauseIds(causeIds: string[]): Promise<Either<ValidationError | RepositoryException, Action[]>>;
  abstract create(actionDto: ActionRequestEventDto): Promise<Either<ValidationError | RepositoryException, Action>>;
  abstract joinEvent(eventId: string, actorId: string): Promise<Either<ValidationError | RepositoryException, void>>;
  abstract leaveEvent(eventId: string, actorId: string): Promise<Either<ValidationError | RepositoryException, void>>;
  abstract contributeObjective(
    actionId: string,
    objectiveName: string,
    actorId: string,
    amount: number,
  ): Promise<Either<ValidationError | RepositoryException, Objective>>;
}
