import { EventSummaryResponseDto } from '../dtos/output/event-summary.response.dto';
import { Event } from '@app/communities/domain/model/entities/event';

export class EventDomainMapper {
  static toEventSummaryDto(event: Event): EventSummaryResponseDto {
    return {
      id: event.id.value,
      name: event.name,
      description: event.description,
      date: event.date,
      place: {
        direction: event.place.direction,
        city: event.place.city,
        countryCode: event.place.countryCode,
      },
    };
  }
}
