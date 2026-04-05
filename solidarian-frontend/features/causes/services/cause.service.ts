import { CAUSE_ENDPOINTS } from '@/features/causes/constants/api.constants';
import type { Cause, CreateCauseDTO, UpdateCauseDTO } from '@/features/causes/model';
import api from '@/features/axios/axios';

export const causeService = {
  /**
   * Obtener todas las causas
   */
  getAll: async (): Promise<Cause[]> => {
    const response = await api.get(CAUSE_ENDPOINTS.GET_ALL);
    return response.data;
  },

  /**
   * Obtener causas recomendadas
   */
  getRecommended: async (limit: number = 6): Promise<Cause[]> => {
    const causes = await causeService.getAll();
    return causes.slice(0, limit);
  },

  /**
   * Obtener causas de una comunidad específica
   */
  getByCommunity: async (communityId: string): Promise<Cause[]> => {
    const response = await api.get(CAUSE_ENDPOINTS.GET_BY_COMMUNITY(communityId));
    return response.data;
  },

  /**
   * Obtener una causa por ID
   */
  getById: async (id: string): Promise<Cause> => {
    const response = await api.get(CAUSE_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  },

  /**
   * Crear una nueva causa
   */
  create: async (data: CreateCauseDTO): Promise<Cause> => {
    const response = await api.post(CAUSE_ENDPOINTS.CREATE, data);
    return response.data;
  },

  /**
   * Actualizar una causa existente
   */
  update: async (id: string, data: UpdateCauseDTO): Promise<Cause> => {
    const response = await api.put(CAUSE_ENDPOINTS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Eliminar una causa
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(CAUSE_ENDPOINTS.DELETE(id));
  },
};
