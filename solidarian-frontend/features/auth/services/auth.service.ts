import api from '@/features/axios/axios';

const AUTH_ENDPOINTS = {
  LOGIN: '/users/login',
  USERS: '/users',
};

// FIXME: Añadir Registro y tenemos que hablar el tema de los JWT (refresh, etc)
export const authService = {
  login: async (username: string, password: string): Promise<void> => {
    await api.post(AUTH_ENDPOINTS.LOGIN, { username, password });
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
};
