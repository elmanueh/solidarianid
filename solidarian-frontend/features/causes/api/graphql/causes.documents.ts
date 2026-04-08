import { Cause, CreateCauseRequestInput } from '@/features/causes/model/causes.model';
import { gql, TypedDocumentNode } from '@apollo/client';

// Query: GetCauses
export type GetCausesResult = {
  causes: Cause[];
};

export type GetCausesVariables = Record<string, never>;

export const GET_CAUSES_QUERY: TypedDocumentNode<GetCausesResult, GetCausesVariables> = gql`
  query GetCauses {
    causes {
      id
      name
      description
      communityId
    }
  }
`;

// Mutation: JoinCause
export type JoinCauseResult = {
  joinCause: boolean;
};

export type JoinCauseVariables = {
  causeId: string;
  userId: string;
};

export const JOIN_CAUSE_MUTATION: TypedDocumentNode<JoinCauseResult, JoinCauseVariables> = gql`
  mutation JoinCause($causeId: ID!, $userId: ID!) {
    joinCause(causeId: $causeId, userId: $userId)
  }
`;

// Mutation: LeaveCause
export type LeaveCauseResult = {
  leaveCause: boolean;
};

export type LeaveCauseVariables = {
  causeId: string;
  userId: string;
};

export const LEAVE_CAUSE_MUTATION: TypedDocumentNode<LeaveCauseResult, LeaveCauseVariables> = gql`
  mutation LeaveCause($causeId: ID!, $userId: ID!) {
    leaveCause(causeId: $causeId, userId: $userId)
  }
`;

// Mutation: CreateCauseRequest
export type CreateCauseRequestResult = {
  createCauseRequest: string;
};

export type CreateCauseRequestVariables = {
  createCauseRequestInput: CreateCauseRequestInput;
};

export const CREATE_CAUSE_REQUEST_MUTATION: TypedDocumentNode<CreateCauseRequestResult, CreateCauseRequestVariables> =
  gql`
    mutation CreateCauseRequest($createCauseRequestInput: CreateCauseRequestInput!) {
      createCauseRequest(createCauseRequestInput: $createCauseRequestInput)
    }
  `;

// Subscription: CauseCreated
export type CauseCreatedResult = {
  causeCreated: Cause;
};

export type CauseCreatedVariables = {
  communityId: string;
};

export const CAUSE_CREATED_SUBSCRIPTION: TypedDocumentNode<CauseCreatedResult, CauseCreatedVariables> = gql`
  subscription CauseCreated($communityId: ID!) {
    causeCreated(communityId: $communityId) {
      id
      name
      communityId
    }
  }
`;
