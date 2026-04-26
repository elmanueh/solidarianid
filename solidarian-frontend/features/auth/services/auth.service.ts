import { User } from '@/features/auth/model/user';
import api from '@/features/axios/axios';
import type { AxiosRequestConfig } from 'axios';

// Browser-oriented auth service.
// Server components must use auth.service.server.ts.

export type UpdateUserProfilePayload = Pick<User, 'fullName' | 'username' | 'mobilePhone' | 'city' | 'countryCode'>;

type GetCurrentUserOptions = {
  skipLoginRedirect?: boolean;
};

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  USERS: '/users',
  ME: '/users/me',
};

export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    await api.post(AUTH_ENDPOINTS.LOGIN, { username, password });
    return authService.getCurrentUser();
  },

  register: async (
    username: string,
    password: string,
    fullName: string,
    mobilePhone: string,
    city: string,
    countryCode: string
  ): Promise<void> => {
    await api.post(AUTH_ENDPOINTS.USERS, {
      username,
      password,
      fullName,
      mobilePhone,
      city,
      countryCode,
    });
  },

  logout: async (): Promise<void> => {
    await api.post(AUTH_ENDPOINTS.LOGOUT);
  },

  getCurrentUser: async (options?: GetCurrentUserOptions): Promise<User> => {
    const requestConfig: AxiosRequestConfig & { _skipLoginRedirect?: boolean } = {};

    if (options?.skipLoginRedirect) {
      requestConfig._skipLoginRedirect = true;
    }

    const response = await api.get(AUTH_ENDPOINTS.ME, requestConfig);
    return response.data as User;
  },

  updateUserProfile: async (userId: string, payload: UpdateUserProfilePayload): Promise<void> => {
    await api.patch(`${AUTH_ENDPOINTS.USERS}/${userId}`, payload);
  },
};
