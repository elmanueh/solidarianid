import { Cause } from '@app/communities/domain/model/entities/cause';
import { ExploreCauseData } from '@app/communities/application/services/explore-cause.data';
import { ExplorePaginatedResultData } from '@app/communities/application/services/explore-paginated-result.data';
import { CauseSummaryResponseDto } from '../dtos/output/cause-summary.response.dto';
import { ActionDomainMapper } from './action.mapper';
import { CauseDetailResponseDto } from '../dtos/output/cause-detail.response.dto';
import { ExploreCauseItemResponseDto } from '../dtos/output/explore-cause-item.response.dto';
import { ExploreCausesResponseDto } from '../dtos/output/explore-causes.response.dto';

export class CauseDomainMapper {
  static toCauseSummaryDto(cause: Cause): CauseSummaryResponseDto {
    return {
      id: cause.id.value,
      name: cause.name,
      description: cause.description,
      durationDays: cause.durationDays,
      ods: cause.ods,
      communityId: cause.communityId,
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

  static toExploreCauseItemDto(cause: ExploreCauseData): ExploreCauseItemResponseDto {
    return {
      id: cause.id,
      communityId: cause.communityId,
      name: cause.name,
      description: cause.description,
      ods: cause.ods,
    };
  }

  static toExploreCausesResponseDto(result: ExplorePaginatedResultData<ExploreCauseData>): ExploreCausesResponseDto {
    return {
      items: result.items.map(cause => this.toExploreCauseItemDto(cause)),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };
  }
}
