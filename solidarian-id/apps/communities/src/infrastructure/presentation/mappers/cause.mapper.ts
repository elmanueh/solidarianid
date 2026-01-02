import { Cause } from '@app/communities/domain/model/entities/cause';
import { CauseSummaryResponseDto } from '../dtos/output/cause-summary.response.dto';
import { ActionDomainMapper } from './action.mapper';
import { CauseDetailResponseDto } from '../dtos/output/cause-detail.response.dto';

export class CauseDomainMapper {
  static toCauseSummaryDto(cause: Cause): CauseSummaryResponseDto {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods,
    };
  }

  static toCauseDetailDto(cause: Cause): CauseDetailResponseDto {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods,
      actions: cause.actions.map(action => ActionDomainMapper.toActionSummaryDto(action)),
    };
  }
}
