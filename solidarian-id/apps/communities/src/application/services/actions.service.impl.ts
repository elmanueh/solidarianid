import { ActionCreatedEvent } from '@app/communities/domain/events/action-created.event';
import { Action } from '@app/communities/domain/model/entities/action';
import { Event } from '@app/communities/domain/model/entities/event';
import { EventPlace } from '@app/communities/domain/model/value-objects/event-place';
import { Objective } from '@app/communities/domain/model/value-objects/objective';
import { ActionsRepositoryPort } from '@app/communities/domain/ports/actions.repository.port';
import { DomainEventBusPort } from '@app/communities/domain/ports/domain-event-bus.port';
import { UsersRepositoryPort } from '@app/communities/domain/ports/users.repository.port';
import { ActionsService } from '@app/communities/domain/services/actions.service';
import { Either, left, right } from '@app/ddd/either';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { ActionRequestEventDto } from '@solidarianid/kafka';

@Injectable()
export class ActionsServiceImpl implements ActionsService {
  constructor(
    private readonly actionRepository: ActionsRepositoryPort,
    private readonly usersRepository: UsersRepositoryPort,
    private readonly eventBus: DomainEventBusPort,
  ) {}

  async create(actionDto: ActionRequestEventDto): Promise<Either<ValidationError | RepositoryException, Action>> {
    // Create action first (without objectives and events)
    const actionOrError = Action.create({
      name: actionDto.name,
      description: actionDto.description,
      objectives: [],
      events: [],
      causeId: actionDto.causeId,
    });

    if (actionOrError.isLeft()) {
      return left(actionOrError.value);
    }

    const action = actionOrError.value;

    // Create and add objectives
    for (const objective of actionDto.objectives) {
      const objectiveOrError = Objective.create({
        name: objective.name,
        description: objective.description,
        quantity: objective.quantity,
        unit: objective.unit,
        actionId: action.id.value,
      });

      if (objectiveOrError.isLeft()) {
        return left(objectiveOrError.value);
      }

      action.addObjective(objectiveOrError.value);
    }

    // Create and add events
    for (const event of actionDto.events) {
      const placeOrError = EventPlace.create({
        direction: event.place.direction,
        city: event.place.city,
        countryCode: event.place.countryCode,
      });

      if (placeOrError.isLeft()) {
        return left(placeOrError.value);
      }

      const eventOrError = Event.create({
        name: event.name,
        description: event.description,
        initialDate: new Date(event.initialDate),
        place: placeOrError.value,
        actionId: action.id.value,
      });

      if (eventOrError.isLeft()) {
        return left(eventOrError.value);
      }

      action.addEvent(eventOrError.value);
    }

    const saveResult = await this.actionRepository.save(action);

    if (saveResult.isLeft()) {
      return left(saveResult.value);
    }

    await this.eventBus.publish(new ActionCreatedEvent(action));

    return right(action);
  }

  async getActions(): Promise<Either<ValidationError, Action[]>> {
    return await this.actionRepository.findAll();
  }

  async getActionById(id: string): Promise<Either<ValidationError, Action>> {
    return await this.actionRepository.findById(id, ['events', 'events.assistants', 'objectives']);
  }

  async getByCauseIds(causeIds: string[]): Promise<Either<ValidationError | RepositoryException, Action[]>> {
    return await this.actionRepository.findAllByCauseIds(causeIds);
  }

  async joinEvent(eventId: string, actorId: string): Promise<Either<ValidationError | RepositoryException, void>> {
    const userOrError = await this.usersRepository.findById(actorId);
    if (userOrError.isLeft()) return left(userOrError.value);
    const user = userOrError.value;

    const actionOrError = await this.actionRepository.findByEventId(eventId);
    if (actionOrError.isLeft()) return left(actionOrError.value);
    const action = actionOrError.value;

    const joinResult = action.joinEvent(eventId, user);
    if (joinResult.isLeft()) return left(joinResult.value);

    const saveResult = await this.actionRepository.save(action);
    if (saveResult.isLeft()) return left(saveResult.value);

    return right(undefined);
  }

  async leaveEvent(eventId: string, actorId: string): Promise<Either<ValidationError | RepositoryException, void>> {
    const userOrError = await this.usersRepository.findById(actorId);
    if (userOrError.isLeft()) return left(userOrError.value);
    const user = userOrError.value;

    const actionOrError = await this.actionRepository.findByEventId(eventId);
    if (actionOrError.isLeft()) return left(actionOrError.value);
    const action = actionOrError.value;

    const leaveResult = action.leaveEvent(eventId, user);
    if (leaveResult.isLeft()) return left(leaveResult.value);

    const removeAssistantResult = await this.actionRepository.removeAssistant(eventId, actorId);
    if (removeAssistantResult.isLeft()) return left(removeAssistantResult.value);

    const saveResult = await this.actionRepository.save(action);
    if (saveResult.isLeft()) return left(saveResult.value);

    return right(undefined);
  }

  async contributeObjective(
    actionId: string,
    objectiveName: string,
    actorId: string,
    amount: number,
  ): Promise<Either<ValidationError | RepositoryException, Objective>> {
    const userOrError = await this.usersRepository.findById(actorId);
    if (userOrError.isLeft()) return left(userOrError.value);
    const user = userOrError.value;

    const actionOrError = await this.actionRepository.findById(actionId, ['objectives', 'objectives.contributors']);
    if (actionOrError.isLeft()) return left(actionOrError.value);
    const action = actionOrError.value;

    const contributeResult = action.contributeObjective(objectiveName, user, amount);
    if (contributeResult.isLeft()) return left(contributeResult.value);
    const updatedObjective = contributeResult.value;

    const saveResult = await this.actionRepository.save(action);
    if (saveResult.isLeft()) return left(saveResult.value);

    return right(updatedObjective);
  }
}
