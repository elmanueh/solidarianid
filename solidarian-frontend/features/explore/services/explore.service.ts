import { exploreCausesMock, exploreCommunitiesMock } from '@/features/explore/mock/explore.mock';
import {
  EXPLORE_DEFAULTS,
  ExploreCauseItem,
  ExploreCommunityItem,
  ExploreListQuery,
  ExplorePaginatedResult,
  ExploreSort,
} from '@/features/explore/model/explore.types';

const normalizeSearch = (search?: string) => search?.trim().toLocaleLowerCase() ?? '';

const compareByName = (sort: ExploreSort) => (a: { name: string }, b: { name: string }) => {
  const result = a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
  return sort === 'name_asc' ? result : result * -1;
};

const paginate = <T>(items: T[], page: number, pageSize: number): ExplorePaginatedResult<T> => {
  const safePageSize = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : EXPLORE_DEFAULTS.pageSize;
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : EXPLORE_DEFAULTS.page;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const boundedPage = Math.min(safePage, totalPages);
  const offset = (boundedPage - 1) * safePageSize;

  return {
    items: items.slice(offset, offset + safePageSize),
    total,
    page: boundedPage,
    pageSize: safePageSize,
    totalPages,
  };
};

const filterAndSortByName = <T extends { name: string }>(items: T[], query: ExploreListQuery): T[] => {
  const search = normalizeSearch(query.search ?? EXPLORE_DEFAULTS.search);
  const sort = query.sort ?? EXPLORE_DEFAULTS.sort;

  const filtered = search ? items.filter(item => item.name.toLocaleLowerCase().includes(search)) : [...items];

  return filtered.sort(compareByName(sort));
};

export class ExploreService {
  getCommunities(query: ExploreListQuery): ExplorePaginatedResult<ExploreCommunityItem> {
    const sortedAndFiltered = filterAndSortByName(exploreCommunitiesMock, query);
    return paginate(
      sortedAndFiltered,
      query.page ?? EXPLORE_DEFAULTS.page,
      query.pageSize ?? EXPLORE_DEFAULTS.pageSize
    );
  }

  getCauses(query: ExploreListQuery): ExplorePaginatedResult<ExploreCauseItem> {
    const sortedAndFiltered = filterAndSortByName(exploreCausesMock, query);
    const odsFilters = query.ods ?? [];
    const filteredByOds =
      odsFilters.length === 0
        ? sortedAndFiltered
        : sortedAndFiltered.filter(cause => odsFilters.some(ods => cause.ods.includes(ods)));
    return paginate(filteredByOds, query.page ?? EXPLORE_DEFAULTS.page, query.pageSize ?? EXPLORE_DEFAULTS.pageSize);
  }
}
