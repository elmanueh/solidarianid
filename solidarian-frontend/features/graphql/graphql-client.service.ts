import { GraphqlClient } from '@/features/graphql/apollo-client';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';

export interface GraphqlRetryOptions {
  attempts?: number;
  initialDelayMs?: number;
}

export interface GraphqlQueryOptions {
  retry?: GraphqlRetryOptions;
}

const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_INITIAL_DELAY_MS = 1000;

export class GraphqlClientService {
  constructor(private readonly client: GraphqlClient) {}

  async query<TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables,
    options: GraphqlQueryOptions = {}
  ): Promise<TData> {
    const retryOptions = options.retry;

    if (!retryOptions) {
      return this.executeQuery(document, variables);
    }

    return this.executeQueryWithRetry(document, variables, retryOptions);
  }

  async mutate<TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables
  ): Promise<TData> {
    const response = await this.client.mutate({
      mutation: document,
      variables,
    });

    if (!response.data) {
      throw new Error('GraphQL mutation returned no data');
    }

    return response.data;
  }

  subscribe<TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables
  ) {
    return this.client.subscribe({
      query: document,
      variables,
    });
  }

  private async executeQuery<TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables
  ): Promise<TData> {
    const response = await this.client.query({
      query: document,
      variables,
      fetchPolicy: 'network-only',
    });

    if (!response.data) {
      throw new Error('GraphQL query returned no data');
    }

    return response.data;
  }

  private async executeQueryWithRetry<TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables,
    retryOptions: GraphqlRetryOptions
  ): Promise<TData> {
    const attempts = Math.max(1, Math.floor(retryOptions.attempts ?? DEFAULT_RETRY_ATTEMPTS));
    const initialDelayMs = Math.max(0, Math.floor(retryOptions.initialDelayMs ?? DEFAULT_RETRY_INITIAL_DELAY_MS));
    let lastError: unknown;

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        return await this.executeQuery(document, variables);
      } catch (error) {
        lastError = error;

        if (attempt === attempts - 1 || !this.shouldRetry(error)) {
          throw error;
        }

        await this.delay(initialDelayMs * (attempt + 1));
      }
    }

    throw lastError instanceof Error ? lastError : new Error('No se pudo cargar la información del inicio.');
  }

  private shouldRetry(error: unknown): boolean {
    if (!(error instanceof Error)) {
      return false;
    }

    const message = error.message.toLowerCase();

    return (
      message.includes('response not successful') ||
      message.includes('failed to fetch') ||
      message.includes('fetch failed') ||
      message.includes('network error') ||
      message.includes('status code 501') ||
      message.includes('status code 502') ||
      message.includes('status code 503') ||
      message.includes('status code 504')
    );
  }

  private async delay(milliseconds: number): Promise<void> {
    await new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }
}
