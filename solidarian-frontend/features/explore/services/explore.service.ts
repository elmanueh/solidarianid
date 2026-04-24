import api from '@/features/axios/axios';
import { ODS_OPTIONS, OdsId } from '@/features/causes/constants/ods.constants';
import { PexelsImageService } from '@/features/images/pexels-image.service';
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

const imageService = new PexelsImageService();

const mapSortToSortOrder = (sort?: ExploreSort): 'asc' | 'desc' => (sort === 'name_desc' ? 'desc' : 'asc');

const mapOdsToApiValues = (ods?: OdsId[]): OdsId[] | undefined => {
  if (!ods || ods.length === 0) {
    return undefined;
  }

  const selected = new Set(ods);
  return ODS_OPTIONS.filter(option => selected.has(option.id)).map(option => option.id);
};

const mapOdsToUiValues = (ods: number[]): OdsId[] =>
  ods.map(value => Number(value)).filter((value): value is OdsId => value >= 1 && value <= 17);

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

const toUiErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

const mapCommunityToUi = async (
  community: ExploreCommunitiesApiResponse['items'][number]
): Promise<ExploreCommunityItem> => ({
  id: community.id,
  name: community.name,
  description: community.description,
  imageUrl: (await imageService.getDeterministicBanner({ uuid: community.id, theme: community.name })).large,
});

const mapCauseToUi = async (cause: ExploreCausesApiResponse['items'][number]): Promise<ExploreCauseItem> => ({
  id: cause.id,
  communityId: cause.communityId,
  name: cause.name,
  description: cause.description,
  ods: mapOdsToUiValues(cause.ods),
  imageUrl: (await imageService.getDeterministicBanner({ uuid: cause.id, theme: cause.name })).large,
});

export class ExploreService {
  async getCommunities(query: ExploreListQuery): Promise<ExplorePaginatedResult<ExploreCommunityItem>> {
    try {
      const response = await api.get<ExploreCommunitiesApiResponse>('/communities/explore', {
        params: mapCommunitiesQueryToApi(query),
      });

      return {
        ...response.data,
        items: await Promise.all(response.data.items.map(mapCommunityToUi)),
      };
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

      return {
        ...response.data,
        items: await Promise.all(response.data.items.map(mapCauseToUi)),
      };
    } catch (error) {
      throw new Error(toUiErrorMessage(error, 'No se pudieron cargar las causas.'));
    }
  }
}
