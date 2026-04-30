import { EventPlace } from '@app/admin/administrator/model/domain/value-objects/event-place';
import { EventUserEntity } from '@app/communities/actions/infrastructure/persistence/entities/event-user.entity';
import { EventEntity } from '@app/communities/actions/infrastructure/persistence/entities/event.entity';
import { Event } from '@app/communities/shared/domain/model/entities/event';
import { User } from '@app/communities/shared/domain/model/entities/user';
import { Either, left, sequence } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventEntityMapper implements Mapper<Event, EventEntity> {
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

    entity.assistants = model.assistants.map(assistant => {
      const eventUserEntity = new EventUserEntity();
      eventUserEntity.eventId = model.id.value;
      eventUserEntity.userId = assistant.id.value;
      eventUserEntity.fullname = assistant.fullName;
      eventUserEntity.email = assistant.email;
      eventUserEntity.mobilePhone = assistant.mobilePhone;
      return eventUserEntity;
    });
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
      entity.assistants?.map(eventUserEntity =>
        User.create(
          {
            fullName: eventUserEntity.fullname,
            email: eventUserEntity.email,
            mobilePhone: eventUserEntity.mobilePhone,
          },
          eventUserEntity.userId,
        ),
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
