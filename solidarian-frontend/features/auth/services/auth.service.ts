import { User } from '@/features/auth/model/user';
import api from '@/features/axios/axios';

export type UpdateUserProfilePayload = Pick<User, 'fullName' | 'username' | 'mobilePhone' | 'city' | 'countryCode'>;

const AUTH_ENDPOINTS = {
  LOGIN: '/users/login',
  USERS: '/users',
  ME: '/users/me',
};

// FIXME: Añadir Registro y tenemos que hablar el tema de los JWT (refresh, etc)
export const authService = {
  login: async (_username: string, _password: string): Promise<User> => {
    void _username;
    void _password;

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

  updateUserProfile: async (userId: string, payload: UpdateUserProfilePayload): Promise<void> => {
    await api.patch(`${AUTH_ENDPOINTS.USERS}/${userId}`, payload);
  },

  getCurrentUser: async (): Promise<User> => {
    // TODO: Implementar esta función para obtener los datos del usuario autenticado usando el token JWT
    // const response = await api.get(AUTH_ENDPOINTS.ME);
    // return response.data as User;
    return {
      id: '205591ab-83e9-4441-bbd6-945ff974054e',
      username: 'pablo',
      fullName: 'Pablo Peris',
      mobilePhone: '+34123456789',
      city: 'Totana',
      countryCode: 'ES',
      // poner preferencias de notificaciones
    };
  },
};
