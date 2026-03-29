import { Injectable } from '@nestjs/common';
import { ActionsService } from '../../domain/services/actions.service';
import { Action } from '../../domain/model/entities/action';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Either, left, right } from '@app/ddd/either';
import { ActionsRepositoryPort } from '../../domain/ports/actions.repository.port';
import { RepositoryException } from '@app/ddd/repository/exceptions/repository.exception';
import { ActionRequestEventDto, EventType } from '@solidarianid/kafka';
import { Objective } from '../../domain/model/value-objects/objective';
import { Event } from '../../domain/model/entities/event';
import { EventPlace } from '../../domain/model/value-objects/event-place';
import {
  ACTION_CREATED_TOPIC,
  pubSub,
} from '@app/communities/infrastructure/presentation/controllers/graphql/subscriptions/community.subscription';
import { ActionsPublisherPort } from '@app/communities/domain/ports/actions.publisher.port';

@Injectable()
export class ActionsServiceImpl implements ActionsService {
  constructor(
    private readonly actionRepository: ActionsRepositoryPort,
    private readonly actionPublisher: ActionsPublisherPort,
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

    await this.actionPublisher.publish(EventType.ACTION_CREATED, action);
    await pubSub.publish(ACTION_CREATED_TOPIC, { actionCreated: action });

    return right(action);
  }

  async getActions(): Promise<Either<ValidationError, Action[]>> {
    return await this.actionRepository.findAll();
  }

  async getActionById(id: string): Promise<Either<ValidationError, Action>> {
    return await this.actionRepository.findById(id, ['events', 'objectives']);
  }

  async getByCauseIds(causeIds: string[]): Promise<Either<ValidationError, Action[]>> {
    return await this.actionRepository.findAllByCauseIds(causeIds);
  }
}
