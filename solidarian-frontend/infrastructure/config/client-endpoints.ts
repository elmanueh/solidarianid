export const CLIENT_ENDPOINTS = {
  graphql: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3002/graphql',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api',
    auth: {
      login: '/login',
      refresh: '/refresh',
    },
  },
} as const;
