import { Mapper } from '@app/ddd/repository/mapper';
import { Injectable } from '@nestjs/common';
import { Either, left, sequence } from '@app/ddd/either';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { EventEntity } from '../entities/evento.entity';
import { Event } from '@app/communities/domain/model/entities/event';
import { EventPlace } from '@app/communities/domain/model/value-objects/event-place';
import { UserEntityMapper } from './user-entity.mapper';

@Injectable()
export class EventEntityMapper implements Mapper<Event, EventEntity> {
  constructor(private readonly userEntityMapper: UserEntityMapper) {}
  toPersistence(model: Event): EventEntity {
    const entity = new EventEntity();
    entity.id = model.id.value;
    entity.name = model.name;
    entity.description = model.description;
    entity.initialDate = model.initialDate;
    entity.place = {
      direction: model.place.direction,
      city: model.place.city,
      countryCode: model.place.countryCode,
    };
    entity.actionId = model.actionId;

    entity.assistants = model.assistants.map((assistant) =>
      this.userEntityMapper.toPersistence(assistant),
    );
    return entity;
  }

  fromPersistence(entity: EventEntity): Either<ValidationError, Event> {
    const placeOrError = EventPlace.create({
      direction: entity.place.direction,
      city: entity.place.city,
      countryCode: entity.place.countryCode,
    });

    if (placeOrError.isLeft()) {
      return left(placeOrError.value);
    }

    const assistantsOrError = sequence(
      entity.assistants.map((assistantEntity) =>
        this.userEntityMapper.fromPersistence(assistantEntity),
      ),
    );

    if (assistantsOrError.isLeft()) {
      return left(assistantsOrError.value);
    }

    return Event.create(
      {
        name: entity.name,
        description: entity.description,
        initialDate: entity.initialDate,
        place: placeOrError.value,
        actionId: entity.actionId,
        assistants: assistantsOrError.value,
      },
      entity.id,
    );
  }
}
