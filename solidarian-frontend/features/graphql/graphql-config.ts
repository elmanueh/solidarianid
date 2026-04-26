export const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:8090/graphql';

export const HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? GRAPHQL_ENDPOINT;

export const WS_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ??
  GRAPHQL_ENDPOINT.replace(/^http(s?):\/\//, (_, secure) => `ws${secure ? 's' : ''}://`);
