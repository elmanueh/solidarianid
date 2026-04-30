import { ExploreSortOrder } from '../../../../shared/domain/model/enums/explore-sort-order';

export interface ExploreCommunitiesCriteria {
  page: number;
  pageSize: number;
  search?: string;
  sortOrder: ExploreSortOrder;
}
