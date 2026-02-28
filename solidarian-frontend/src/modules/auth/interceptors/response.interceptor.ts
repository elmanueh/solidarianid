import { APP_ROUTES } from "@/app.routes";
import { AUTH_ENDPOINTS } from "@/modules/auth/constants/api.constants";
import { REFRESH_TOKEN_TIMEOUT } from "@/modules/auth/constants/auth.constants";
import { authService } from "@/modules/auth/services/auth.service";
import api from "@/modules/axios/axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = () => {
  failedQueue.forEach((callback) => callback());
  failedQueue = [];
};

// FIXME: Interceptor axios para pedir access automaticamente al recibir 401
export const authResponseInterceptor = async (
  error: AxiosError,
): Promise<AxiosResponse | Promise<AxiosError>> => {
  const { response, config } = error;
  const originalRequest = config as InternalAxiosRequestConfig;
  const status = response?.status;
  const pathname = window.location.pathname;

  const shouldRefresh =
    status === 401 &&
    pathname !== APP_ROUTES.LOGIN &&
    !originalRequest._retry &&
    !originalRequest.url?.includes(AUTH_ENDPOINTS.REFRESH);

  if (!shouldRefresh) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  if (!isRefreshing) {
    isRefreshing = true;

    const refreshPromise = authService.refreshToken();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Refresh token timeout")),
        REFRESH_TOKEN_TIMEOUT,
      ),
    );

    try {
      await Promise.race([refreshPromise, timeoutPromise]);
      processQueue();
      return api.request(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      failedQueue = [];
      window.location.href = APP_ROUTES.LOGIN;
      return Promise.reject(refreshError);
    }
  }

  // Si ya estamos refrescando, encola la petición
  return new Promise((resolve) => {
    failedQueue.push(() => resolve(api.request(originalRequest)));
  });
};
