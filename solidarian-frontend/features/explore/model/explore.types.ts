export type ExploreMode = 'communities' | 'causes';

export type ExploreSort = 'name_asc' | 'name_desc';

export type ExploreApiSortOrder = 'asc' | 'desc';

export type ExploreCommunityItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type ExploreCauseItem = {
  id: string;
  communityId: string;
  name: string;
  description: string;
  ods: string[];
  imageUrl: string;
};

export type ExploreListQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: ExploreSort;
  ods?: string[];
};

export type ExplorePaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ExploreCommunitiesApiQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortOrder?: ExploreApiSortOrder;
};

export type ExploreCausesApiQuery = ExploreCommunitiesApiQuery & {
  ods?: string[];
};

export type ExploreCommunityApiItem = {
  id: string;
  name: string;
  description: string;
};

export type ExploreCauseApiItem = {
  id: string;
  communityId: string;
  name: string;
  description: string;
  ods: Array<number | string>;
};

export type ExploreCommunitiesApiResponse = ExplorePaginatedResult<ExploreCommunityApiItem>;

export type ExploreCausesApiResponse = ExplorePaginatedResult<ExploreCauseApiItem>;

export const EXPLORE_DEFAULTS = {
  mode: 'communities' as ExploreMode,
  page: 1,
  pageSize: 6,
  search: '',
  sort: 'name_asc' as ExploreSort,
};
