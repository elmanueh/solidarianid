import { ActionDomainMapper } from '@app/communities/actions/infrastructure/presentation/controllers/rest/mappers/action.mapper';
import { ExploreCauseData } from '@app/communities/causes/application/services/data/explore-cause.data';
import { CauseDetailResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/cause-detail.response.dto';
import { CauseSummaryResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/cause-summary.response.dto';
import { ExploreCauseItemResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/explore-cause-item.response.dto';
import { ExploreCausesResponseDto } from '@app/communities/causes/infrastructure/presentation/controllers/rest/dtos/output/explore-causes.response.dto';
import { Cause } from '@app/communities/shared/domain/model/aggregates/cause';
import { ExplorePaginatedResultData } from '@app/communities/shared/domain/model/pagination/explore-paginated-result.data';

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
