import {
  CAUSE_CREATED_SUBSCRIPTION,
  CREATE_CAUSE_REQUEST_MUTATION,
  GET_CAUSES_QUERY,
  JOIN_CAUSE_MUTATION,
  LEAVE_CAUSE_MUTATION,
  type CauseCreatedVariables,
  type CreateCauseRequestVariables,
  type JoinCauseVariables,
  type LeaveCauseVariables,
} from '@/features/causes/api/graphql/causes.documents';
import { Cause } from '@/features/causes/model/causes.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';

export const causesGraphqlApi = {
  async getCauses(client: GraphqlClient): Promise<Cause[]> {
    const response = await client.query({
      query: GET_CAUSES_QUERY,
      fetchPolicy: 'network-only',
    });

    if (!response.data) {
      throw new Error('GetCauses returned no data');
    }

    return response.data.causes;
  },

  async joinCause(client: GraphqlClient, variables: JoinCauseVariables) {
    const response = await client.mutate({
      mutation: JOIN_CAUSE_MUTATION,
      variables,
    });

    return response.data?.joinCause ?? false;
  },

  async leaveCause(client: GraphqlClient, variables: LeaveCauseVariables) {
    const response = await client.mutate({
      mutation: LEAVE_CAUSE_MUTATION,
      variables,
    });

    return response.data?.leaveCause ?? false;
  },

  async createCauseRequest(client: GraphqlClient, variables: CreateCauseRequestVariables) {
    const response = await client.mutate({
      mutation: CREATE_CAUSE_REQUEST_MUTATION,
      variables,
    });

    const requestId = response.data?.createCauseRequest;

    if (!requestId) {
      throw new Error('createCauseRequest returned an empty response');
    }

    return requestId;
  },

  subscribeToCauseCreated(client: GraphqlClient, variables: CauseCreatedVariables) {
    return client.subscribe({
      query: CAUSE_CREATED_SUBSCRIPTION,
      variables,
    });
  },
};
