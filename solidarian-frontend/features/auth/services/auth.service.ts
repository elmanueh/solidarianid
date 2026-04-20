import { CauseKey } from '@/components/preferences/preferences-category';
import { User } from '@/features/auth/model/user';
import api from '@/features/axios/axios';

const AUTH_ENDPOINTS = {
  LOGIN: '/users/login',
  USERS: '/users',
  ME: '/users/me',
};

// FIXME: Añadir Registro y tenemos que hablar el tema de los JWT (refresh, etc)
export const authService = {
  login: async (username: string, password: string): Promise<User> => {
    // TODO: devolver datos del usuario en el login
    //await api.post(AUTH_ENDPOINTS.LOGIN, { username, password });
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

  getCurrentUser: async (): Promise<User> => {
    // TODO: Implementar esta función para obtener los datos del usuario autenticado usando el token JWT
    // const response = await api.get(AUTH_ENDPOINTS.ME);
    // return response.data as User;
    return {
      id: '57cfd39c-9bf0-4570-950c-bd19a7b52ca0',
      username: 'pablo',
      fullName: 'Pablo Peris',
      mobilePhone: '+34123456789',
      city: 'Totana',
      countryCode: 'ES',
      preferences: {
        preferredSDGs: [1, 3, 5],
        preferredCategories: [CauseKey.CHILDREN_YOUTH, CauseKey.ENVIRONMENT],
        durationPreferences: ['short_term', 'medium_term'],
        notificationsEnabled: true,
      },
    };
  },
};
