import 'server-only';

import { type User } from '@/features/auth/model/user';
import { getServerAxiosClient } from '@/features/axios/axios.server';

const AUTH_ENDPOINTS = {
  ME: '/users/me',
};

export const authServiceServer = {
  getCurrentUser: async (): Promise<User> => {
    const api = await getServerAxiosClient();
    const response = await api.get(AUTH_ENDPOINTS.ME);
    return response.data as User;
  },
};
