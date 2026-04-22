import api from '@/features/axios/axios';
import { ODS_OPTIONS } from '@/features/causes/constants/ods.constants';
import {
  ExploreCausesApiQuery,
  ExploreCausesApiResponse,
  ExploreCauseItem,
  ExploreCommunitiesApiQuery,
  ExploreCommunitiesApiResponse,
  ExploreCommunityItem,
  ExploreListQuery,
  ExplorePaginatedResult,
  ExploreSort,
} from '@/features/explore/model/explore.types';

const COMMUNITY_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469571486292-b53601020a0b?w=1200&auto=format&fit=crop',
] as const;

const CAUSE_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop',
] as const;

const getStableImageIndex = (seed: string, poolSize: number): number => {
  const sum = seed.split('').reduce((accumulator, character) => accumulator + (character.codePointAt(0) ?? 0), 0);

  return sum % poolSize;
};

const getCommunityImageUrl = (communityId: string): string => {
  const imageIndex = getStableImageIndex(communityId, COMMUNITY_IMAGE_URLS.length);
  return COMMUNITY_IMAGE_URLS[imageIndex];
};

const getCauseImageUrl = (causeId: string): string => {
  const imageIndex = getStableImageIndex(causeId, CAUSE_IMAGE_URLS.length);
  return CAUSE_IMAGE_URLS[imageIndex];
};

const mapSortToSortOrder = (sort?: ExploreSort): 'asc' | 'desc' => (sort === 'name_desc' ? 'desc' : 'asc');

const mapOdsToApiValues = (ods?: string[]): string[] | undefined => {
  if (!ods || ods.length === 0) {
    return undefined;
  }

  const selected = new Set(ods);
  return ODS_OPTIONS.filter(option => selected.has(option.value)).map(option => `ODS_${option.num}`);
};

const mapOdsToUiValues = (ods: Array<number | string>): string[] =>
  ods
    .map(value => Number(value))
    .map(value => ODS_OPTIONS.find(option => option.num === value)?.value)
    .filter((value): value is string => Boolean(value));

const mapCommunitiesQueryToApi = (query: ExploreListQuery): ExploreCommunitiesApiQuery => ({
  page: query.page,
  pageSize: query.pageSize,
  search: query.search?.trim() || undefined,
  sortOrder: mapSortToSortOrder(query.sort),
});

const mapCausesQueryToApi = (query: ExploreListQuery): ExploreCausesApiQuery => ({
  ...mapCommunitiesQueryToApi(query),
  ods: mapOdsToApiValues(query.ods),
});

const mapCommunitiesResponseToUi = (
  response: ExploreCommunitiesApiResponse
): ExplorePaginatedResult<ExploreCommunityItem> => ({
  ...response,
  items: response.items.map(community => ({
    id: community.id,
    name: community.name,
    description: community.description,
    imageUrl: getCommunityImageUrl(community.id),
  })),
});

const mapCausesResponseToUi = (response: ExploreCausesApiResponse): ExplorePaginatedResult<ExploreCauseItem> => ({
  ...response,
  items: response.items.map(cause => ({
    id: cause.id,
    communityId: cause.communityId,
    name: cause.name,
    description: cause.description,
    ods: mapOdsToUiValues(cause.ods),
    imageUrl: getCauseImageUrl(cause.id),
  })),
});

const toUiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export class ExploreService {
  async getCommunities(query: ExploreListQuery): Promise<ExplorePaginatedResult<ExploreCommunityItem>> {
    try {
      const response = await api.get<ExploreCommunitiesApiResponse>('/communities/explore', {
        params: mapCommunitiesQueryToApi(query),
      });

      return mapCommunitiesResponseToUi(response.data);
    } catch (error) {
      throw new Error(toUiErrorMessage(error, 'No se pudieron cargar las comunidades.'));
    }
  }

  async getCauses(query: ExploreListQuery): Promise<ExplorePaginatedResult<ExploreCauseItem>> {
    try {
      const response = await api.get<ExploreCausesApiResponse>('/causes/explore', {
        params: mapCausesQueryToApi(query),
        paramsSerializer: {
          indexes: null,
        },
      });

      return mapCausesResponseToUi(response.data);
    } catch (error) {
      throw new Error(toUiErrorMessage(error, 'No se pudieron cargar las causas.'));
    }
  }
}
