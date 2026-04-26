import { store } from '@/features/redux/store';
import { handleLogout } from '@/features/redux/userSlice';
import { ROUTES } from '@/features/routes';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

// Browser-only Axios client.
// Keep REST calls on Next origin via relative /api.

type RetriableRequestConfig = AxiosRequestConfig & {
  _sessionRetried?: boolean;
  _skipLoginRedirect?: boolean;
};

const API_BASE_URL = '/api';

const AUTH_RECOVERY_EXCLUDED_PATHS = new Set(['/auth/login', '/auth/logout', '/auth/refresh']);

const shouldSkipSessionRecovery = (url?: string): boolean => {
  if (!url) {
    return true;
  }

  return AUTH_RECOVERY_EXCLUDED_PATHS.has(url);
};

const redirectToLogin = (): void => {
  if (globalThis.window === undefined) {
    return;
  }

  if (globalThis.location.pathname === ROUTES.auth.login) {
    return;
  }

  globalThis.location.replace(ROUTES.auth.login);
};

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401 || shouldSkipSessionRecovery(originalRequest.url)) {
      throw error;
    }

    if (originalRequest._sessionRetried) {
      throw error;
    }

    originalRequest._sessionRetried = true;

    try {
      await refreshClient.post('/auth/refresh');
      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch(handleLogout());

      if (!originalRequest._skipLoginRedirect) {
        redirectToLogin();
      }

      return refreshError;
    }
  }
);

export default api;
