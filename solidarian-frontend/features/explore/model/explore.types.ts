export type ExploreMode = 'communities' | 'causes';

export type ExploreSort = 'name_asc' | 'name_desc';

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

export const EXPLORE_DEFAULTS = {
  mode: 'communities' as ExploreMode,
  page: 1,
  pageSize: 6,
  search: '',
  sort: 'name_asc' as ExploreSort,
};
