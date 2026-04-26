const GOOGLE_OAUTH_LOGIN_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_LOGIN_URL!;
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL!;
const GATEWAY_GRAPHQL_URL = `${GATEWAY_URL}/graphql`;
const GATEWAY_GRAPHQL_WS_URL = GATEWAY_GRAPHQL_URL.replace(/^http/, 'ws');

const isBrowser = (): boolean => globalThis.window !== undefined;

const normalizePath = (path: string, prefix?: string): string => {
  const cleanPath = path.replace(/^\/+/, '');

  if (prefix && !cleanPath.startsWith(`${prefix}/`)) {
    return `/${prefix}/${cleanPath}`;
  }

  return `/${cleanPath}`;
};

const resolveUrl = (path: string, prefix?: string): string => {
  const relativePath = normalizePath(path, prefix);

  return isBrowser() ? relativePath : new URL(relativePath, GATEWAY_URL).toString();
};

const apiUrl = (path: string): string => resolveUrl(path, 'api');
const gatewayUrl = (path: string): string => resolveUrl(path);

export const APP_URLS = {
  api: {
    subscriptions: {
      byUser: (userId: string) => apiUrl(`subscriptions/${encodeURIComponent(userId)}`),
    },
    users: {
      preferences: (userId: string) => apiUrl(`users/${encodeURIComponent(userId)}/preferences`),
    },
  },
  auth: {
    googleOauthLogin: GOOGLE_OAUTH_LOGIN_URL,
  },
  gateway: {
    photos: () => gatewayUrl('/photos'),
  },
  graphql: {
    http: GATEWAY_GRAPHQL_URL,
    ws: GATEWAY_GRAPHQL_WS_URL,
  },
} as const;
