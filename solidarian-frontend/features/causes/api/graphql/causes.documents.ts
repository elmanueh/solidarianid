import { gql, TypedDocumentNode } from '@apollo/client';

// Query: GetCauses
export type GetCausesResult = {
  causes: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    communityId: string;
  }[];
};

export type GetCausesVariables = Record<string, never>;

export const GET_CAUSES_QUERY: TypedDocumentNode<GetCausesResult, GetCausesVariables> = gql`
  query GetCauses {
    causes {
      id
      name
      description
      durationDays
      communityId
    }
  }
`;

export type GetFavoriteCausesByUserResult = {
  userFollowedCauses: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    communityId: string;
  }[];
};

export type GetFavoriteCausesByUserVariables = {
  userId: string;
};

export const GET_FAVORITE_CAUSES_BY_USER_QUERY: TypedDocumentNode<
  GetFavoriteCausesByUserResult,
  GetFavoriteCausesByUserVariables
> = gql`
  query GetFavoriteCausesByUser($userId: ID!) {
    userFollowedCauses(userId: $userId) {
      id
      name
      description
      durationDays
      communityId
    }
  }
`;

// Query: GetCauseByCommunityIdAndCauseId
export type GetCauseByCommunityIdAndCauseIdResult = {
  causeByCommunity: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    initialDate: string;
    ods: number[];
    userIds: string[];
    actions: {
      id: string;
      name: string;
      description: string;
      objectives: {
        name: string;
      }[];
      events: {
        id: string;
      }[];
    }[];
  };
};

export type GetCauseByCommunityIdAndCauseIdVariables = {
  communityId: string;
  causeId: string;
};

export const GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY: TypedDocumentNode<
  GetCauseByCommunityIdAndCauseIdResult,
  GetCauseByCommunityIdAndCauseIdVariables
> = gql`
  query CauseByCommunity($communityId: ID!, $causeId: ID!) {
    causeByCommunity(communityId: $communityId, causeId: $causeId) {
      id
      name
      description
      durationDays
      initialDate
      ods
      userIds
      actions {
        id
        name
        description
        objectives {
          name
        }
        events {
          id
        }
      }
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
  createCauseRequestInput: {
    name: string;
    description: string;
    ods: number[];
    initialDate: string;
    durationDays: number;
    userId: string;
    communityId: string;
  };
};

export const CREATE_CAUSE_REQUEST_MUTATION: TypedDocumentNode<CreateCauseRequestResult, CreateCauseRequestVariables> =
  gql`
    mutation CreateCauseRequest($createCauseRequestInput: CreateCauseRequestInput!) {
      createCauseRequest(createCauseRequestInput: $createCauseRequestInput)
    }
  `;

// Subscription: CauseCreated
export type CauseCreatedResult = {
  causeCreated: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    communityId: string;
  };
};

export type CauseCreatedVariables = {
  communityId: string;
};

export const CAUSE_CREATED_SUBSCRIPTION: TypedDocumentNode<CauseCreatedResult, CauseCreatedVariables> = gql`
  subscription CauseCreated($communityId: ID!) {
    causeCreated(communityId: $communityId) {
      id
      name
      description
      durationDays
      communityId
    }
  }
`;
