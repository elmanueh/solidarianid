import { COMMUNITY_ENDPOINTS } from '@/features/communities/constants/api.constants';
import type { Community, CreateCommunityDTO, UpdateCommunityDTO } from '@/features/communities/model';
import api from '@/features/axios/axios';

export const communityService = {
  /**
   * Obtener todas las comunidades
   */
  getAll: async (): Promise<Community[]> => {
    const response = await api.get(COMMUNITY_ENDPOINTS.GET_ALL);
    return response.data;
  },

  /**
   * Obtener comunidades destacadas (ordenadas por número de miembros)
   */
  getFeatured: async (limit: number = 4): Promise<Community[]> => {
    const communities = await communityService.getAll();
    return communities.sort((a, b) => b.memberCount - a.memberCount).slice(0, limit);
  },

  /**
   * Obtener una comunidad por ID
   */
  getById: async (id: string): Promise<Community> => {
    const response = await api.get(COMMUNITY_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  },
};
