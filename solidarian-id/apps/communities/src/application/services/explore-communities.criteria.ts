import { ExploreSortOrder } from './explore-sort-order';

export interface ExploreCommunitiesCriteria {
  page: number;
  pageSize: number;
  search?: string;
  sortOrder: ExploreSortOrder;
}
