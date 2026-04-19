import { GraphqlClient } from '@/features/graphql/apollo-client';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';

export class GraphqlClientService {
  constructor(private readonly client: GraphqlClient) {}

  async query<TData, TVariables extends OperationVariables>(
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
}
