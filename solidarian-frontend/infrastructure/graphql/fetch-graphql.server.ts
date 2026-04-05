import 'server-only';

type GraphQLErrorShape = {
  message: string;
};

type FetchGraphQLOptions<TVariables extends Record<string, unknown>> = {
  endpoint: string;
  query: string;
  variables?: TVariables;
  operationName?: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorShape[];
};

export async function fetchGraphQL<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  options: FetchGraphQLOptions<TVariables>
): Promise<TData> {
  const response = await fetch(options.endpoint, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables,
      operationName: options.operationName,
    }),
  });

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (!response.ok) {
    throw new Error(`GraphQL HTTP ${response.status}: ${response.statusText}`);
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'GraphQL request failed');
  }

  if (!payload.data) {
    throw new Error('No data returned from GraphQL');
  }

  return payload.data;
}
