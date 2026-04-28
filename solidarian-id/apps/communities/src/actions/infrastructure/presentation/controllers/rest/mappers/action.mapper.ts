import { Action } from '@app/communities/shared/domain/model/aggregates/action';
import { ActionDetailResponseDto } from '../dtos/output/action-detail.response.dto';
import { ActionSummaryResponseDto } from '../dtos/output/action-summary.response.dto';
import { EventDomainMapper } from './event.mapper';
import { ObjetiveDomainMapper } from './objetive.mapper';

export class ActionDomainMapper {
  static toActionSummaryDto(action: Action): ActionSummaryResponseDto {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,
    };
  }

  static toActionDetailDto(action: Action): ActionDetailResponseDto {
    return {
      id: action.id.value,
      name: action.name,
      description: action.description,
      events: action.events.map(event => EventDomainMapper.toEventSummaryDto(event)),
      objectives: action.objectives.map(objective => ObjetiveDomainMapper.toObjetiveSummaryDto(objective)),
    };
  }
}
