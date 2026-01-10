import { Request } from '@app/admin/administrator/model/domain/models/request';
import { RequestType } from '@app/admin/administrator/model/domain/enums/request-type';
import { CauseRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/cause-request.entity';
import { RequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/request.entity';
import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';
import { CommunityRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/community-request.entity';
import { ActionRequest } from '@app/admin/administrator/model/domain/models/action-request';
import { ActionRequestEntity } from '@app/admin/administrator/model/infrastructure/persistence/entities/action-request.entity';
import { Objective } from '@app/admin/administrator/model/domain/value-objects/objective';
import { Event } from '@app/admin/administrator/model/domain/value-objects/event';
import { CommunityRequest } from '@app/admin/administrator/model/domain/models/community-request';
import { ObjectiveEmbedded } from '@app/admin/administrator/model/infrastructure/persistence/entities/embedded/objective.embedded';
import { EventEmbedded } from '@app/admin/administrator/model/infrastructure/persistence/entities/embedded/event.embedded';
import { EventPlace } from '@app/admin/administrator/model/domain/value-objects/event-place';
import { CauseRequest } from '@app/admin/administrator/model/domain/models/cause-request';

@Injectable()
export class RequestMapper extends Mapper<Request<unknown>, RequestEntity> {
  toPersistence(model: Request<unknown>): RequestEntity {
    const baseFields = {
      _id: model.id.value,
      name: model.name,
      description: model.description,
      status: model.status,
      reason: model.reason,
      userId: model.userId,
    };

    if (model instanceof CommunityRequest) {
      return {
        ...baseFields,
        type: RequestType.COMMUNITY,
      } as CommunityRequestEntity;
    }

    if (model instanceof CauseRequest) {
      return {
        ...baseFields,
        type: RequestType.CAUSE,
        ods: [...model.ods],
        startDate: model.startDate,
        duration: model.duration,
        communityId: model.communityId,
      } as CauseRequestEntity;
    }

    if (model instanceof ActionRequest) {
      return {
        ...baseFields,
        type: RequestType.ACTION,
        causeId: model.causeId,
        objectives: this.objectivesToEmbedded(model.objectives),
        events: this.eventsToEmbedded(model.events),
      } as ActionRequestEntity;
    }

    throw new Error(`Unsupported request type: ${model.constructor.name}`);
  }

  fromPersistence(entity: RequestEntity): Either<ValidationError, Request<unknown>> {
    switch (entity.type) {
      case RequestType.COMMUNITY:
        return this.reconstituteCommunityRequest(entity as CommunityRequestEntity);
      case RequestType.CAUSE:
        return this.reconstituteCauseRequest(entity as CauseRequestEntity);
      case RequestType.ACTION:
        return this.reconstituteActionRequest(entity as ActionRequestEntity);
      default:
        return left(new ValidationError(`No mapper found for request type ${String(entity.type)}`));
    }
  }

  // ---------------------------------------------------------------------------
  // Private reconstitution helpers
  // ---------------------------------------------------------------------------

  private reconstituteCommunityRequest(entity: CommunityRequestEntity): Either<ValidationError, CommunityRequest> {
    return CommunityRequest.reconstitute({
      id: entity._id,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      reason: entity.reason,
      userId: entity.userId,
      causes: [],
      createdAt: entity.createdAt,
    });
  }

  private reconstituteCauseRequest(entity: CauseRequestEntity): Either<ValidationError, CauseRequest> {
    return CauseRequest.reconstitute({
      id: entity._id,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      reason: entity.reason,
      userId: entity.userId,
      ods: entity.ods,
      startDate: entity.startDate,
      duration: entity.duration,
      actions: [],
      communityId: entity.communityId,
      createdAt: entity.createdAt,
    });
  }

  private reconstituteActionRequest(entity: ActionRequestEntity): Either<ValidationError, ActionRequest> {
    const objectivesOrError = this.reconstituteObjectives(entity.objectives);
    if (objectivesOrError.isLeft()) return left(objectivesOrError.value);

    const eventsOrError = this.reconstituteEvents(entity.events);
    if (eventsOrError.isLeft()) return left(eventsOrError.value);

    return ActionRequest.reconstitute({
      id: entity._id,
      name: entity.name,
      description: entity.description,
      status: entity.status,
      reason: entity.reason,
      userId: entity.userId,
      objectives: objectivesOrError.value,
      events: eventsOrError.value,
      causeId: entity.causeId,
      createdAt: entity.createdAt,
    });
  }

  private reconstituteObjectives(objectives: ObjectiveEmbedded[]): Either<ValidationError, Objective[]> {
    const results = objectives.map(obj =>
      Objective.reconstitute({
        name: obj.name,
        description: obj.description,
        quantity: obj.quantity,
        unit: obj.unit,
        currentAmount: obj.currentAmount,
      }),
    );

    return sequence(results);
  }

  private reconstituteEvents(events: EventEmbedded[]): Either<ValidationError, Event[]> {
    const results = events.map(e => {
      const placeOrError = EventPlace.reconstitute({
        direction: e.place.direction,
        city: e.place.city,
        countryCode: e.place.countryCode,
      });

      if (placeOrError.isLeft()) return left<ValidationError, Event>(placeOrError.value);

      return Event.reconstitute({
        name: e.name,
        description: e.description,
        initialDate: e.initialDate,
        place: placeOrError.value,
      });
    });

    return sequence(results);
  }

  // ---------------------------------------------------------------------------
  // Embedded mappers
  // ---------------------------------------------------------------------------

  private objectivesToEmbedded(objectives: ReadonlyArray<Objective>): ObjectiveEmbedded[] {
    return objectives.map(obj => ({
      name: obj.name,
      description: obj.description,
      quantity: obj.quantity,
      unit: obj.unit,
      currentAmount: obj.currentAmount,
    }));
  }

  private eventsToEmbedded(events: ReadonlyArray<Event>): EventEmbedded[] {
    return events.map(e => ({
      name: e.name,
      description: e.description,
      initialDate: e.initialDate,
      place: {
        direction: e.place.direction,
        city: e.place.city,
        countryCode: e.place.countryCode,
      },
    }));
  }

  // ---------------------------------------------------------------------------
  // COMMUNITY aggregate helpers (community -> causes -> actions)
  // ---------------------------------------------------------------------------

  toPersistenceAggregate(community: CommunityRequest): {
    community: CommunityRequestEntity;
    causes: CauseRequestEntity[];
    actions: ActionRequestEntity[];
  } {
    const communityDoc: CommunityRequestEntity = {
      _id: community.id.value,
      name: community.name,
      description: community.description,
      status: community.status,
      reason: community.reason,
      userId: community.userId,
      type: RequestType.COMMUNITY,
    };

    const causes: CauseRequestEntity[] = [];
    const actions: ActionRequestEntity[] = [];

    for (const cause of community.causes) {
      const causeDoc: CauseRequestEntity = {
        _id: cause.id.value,
        name: cause.name,
        description: cause.description,
        status: cause.status,
        reason: cause.reason,
        userId: cause.userId,
        type: RequestType.CAUSE,
        communityId: community.id.value,
        ods: [...cause.ods],
        startDate: cause.startDate,
        duration: cause.duration,
      };

      causes.push(causeDoc);

      for (const action of cause.actions) {
        const actionDoc: ActionRequestEntity = {
          _id: action.id.value,
          name: action.name,
          description: action.description,
          status: action.status,
          reason: action.reason,
          userId: action.userId,
          type: RequestType.ACTION,
          causeId: cause.id.value,
          objectives: this.objectivesToEmbedded(action.objectives),
          events: this.eventsToEmbedded(action.events),
        };

        actions.push(actionDoc);
      }
    }

    return { community: communityDoc, causes, actions };
  }

  fromPersistenceAggregate(
    community: CommunityRequestEntity,
    causes: CauseRequestEntity[],
    actions: ActionRequestEntity[],
  ): Either<ValidationError, CommunityRequest> {
    // Group actions by causeId
    const actionsByCauseId = new Map<string, ActionRequestEntity[]>();
    for (const action of actions) {
      const existing = actionsByCauseId.get(action.causeId) ?? [];
      existing.push(action);
      actionsByCauseId.set(action.causeId, existing);
    }

    // Reconstitute actions for each cause
    const causesOrError = sequence(
      causes.map(cause => {
        const causeActions = actionsByCauseId.get(cause._id) ?? [];

        const actionsOrError = sequence(
          causeActions.map(action => {
            const objectivesOrError = this.reconstituteObjectives(action.objectives);
            if (objectivesOrError.isLeft()) return left<ValidationError, ActionRequest>(objectivesOrError.value);

            const eventsOrError = this.reconstituteEvents(action.events);
            if (eventsOrError.isLeft()) return left<ValidationError, ActionRequest>(eventsOrError.value);

            return ActionRequest.reconstitute({
              id: action._id,
              name: action.name,
              description: action.description,
              userId: action.userId,
              status: action.status,
              reason: action.reason,
              causeId: action.causeId,
              objectives: objectivesOrError.value,
              events: eventsOrError.value,
            });
          }),
        );

        if (actionsOrError.isLeft()) return left<ValidationError, CauseRequest>(actionsOrError.value);

        return CauseRequest.reconstitute({
          id: cause._id,
          name: cause.name,
          description: cause.description,
          userId: cause.userId,
          status: cause.status,
          reason: cause.reason,
          communityId: cause.communityId,
          ods: cause.ods,
          startDate: cause.startDate,
          duration: cause.duration,
          actions: actionsOrError.value,
        });
      }),
    );

    if (causesOrError.isLeft()) return left(causesOrError.value);

    return CommunityRequest.reconstitute({
      id: community._id,
      name: community.name,
      description: community.description,
      userId: community.userId,
      status: community.status,
      reason: community.reason,
      causes: causesOrError.value,
    });
  }

  // ---------------------------------------------------------------------------
  // CAUSE aggregate helpers (cause -> actions)
  // ---------------------------------------------------------------------------

  toPersistenceCauseAggregate(cause: CauseRequest): {
    cause: CauseRequestEntity;
    actions: ActionRequestEntity[];
  } {
    const causeDoc: CauseRequestEntity = {
      _id: cause.id.value,
      name: cause.name,
      description: cause.description,
      status: cause.status,
      reason: cause.reason,
      userId: cause.userId,
      type: RequestType.CAUSE,
      communityId: cause.communityId,
      ods: [...cause.ods],
      startDate: cause.startDate,
      duration: cause.duration,
    };

    const actions: ActionRequestEntity[] = cause.actions.map(action => ({
      _id: action.id.value,
      name: action.name,
      description: action.description,
      status: action.status,
      reason: action.reason,
      userId: action.userId,
      type: RequestType.ACTION,
      causeId: cause.id.value,
      objectives: this.objectivesToEmbedded(action.objectives),
      events: this.eventsToEmbedded(action.events),
    }));

    return { cause: causeDoc, actions };
  }

  fromPersistenceCauseAggregate(
    cause: CauseRequestEntity,
    actions: ActionRequestEntity[],
  ): Either<ValidationError, CauseRequest> {
    const actionsOrError = sequence(
      actions.map(action => {
        const objectivesOrError = this.reconstituteObjectives(action.objectives);
        if (objectivesOrError.isLeft()) return left<ValidationError, ActionRequest>(objectivesOrError.value);

        const eventsOrError = this.reconstituteEvents(action.events);
        if (eventsOrError.isLeft()) return left<ValidationError, ActionRequest>(eventsOrError.value);

        return ActionRequest.reconstitute({
          id: action._id,
          name: action.name,
          description: action.description,
          userId: action.userId,
          status: action.status,
          reason: action.reason,
          causeId: action.causeId,
          objectives: objectivesOrError.value,
          events: eventsOrError.value,
        });
      }),
    );

    if (actionsOrError.isLeft()) return left(actionsOrError.value);

    return CauseRequest.reconstitute({
      id: cause._id,
      name: cause.name,
      description: cause.description,
      userId: cause.userId,
      status: cause.status,
      reason: cause.reason,
      communityId: cause.communityId,
      ods: cause.ods,
      startDate: cause.startDate,
      duration: cause.duration,
      actions: actionsOrError.value,
    });
  }
}
