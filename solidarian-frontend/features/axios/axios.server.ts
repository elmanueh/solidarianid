import 'server-only';

import axios, { type AxiosInstance } from 'axios';
import { headers } from 'next/headers';

const DEFAULT_LOCAL_HOST = 'localhost:3000';

const getFirstHeaderValue = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  const firstValue = value.split(',')[0]?.trim();
  return firstValue || null;
};

const resolveServerApiBaseUrl = (requestHeaders: Headers): string => {
  const protocol = getFirstHeaderValue(requestHeaders.get('x-forwarded-proto')) ?? 'http';
  const host =
    getFirstHeaderValue(requestHeaders.get('x-forwarded-host')) ??
    getFirstHeaderValue(requestHeaders.get('host')) ??
    DEFAULT_LOCAL_HOST;

  return `${protocol}://${host}/api`;
};

export const getServerAxiosClient = async (): Promise<AxiosInstance> => {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie') ?? '';
  const baseURL = resolveServerApiBaseUrl(requestHeaders);

  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    withCredentials: true,
  });
};
