import 'server-only';

export const SERVER_ENDPOINTS = {
  graphql: process.env.GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3002/graphql',
} as const;
