import { gql, TypedDocumentNode } from '@apollo/client';

// Query: GetCommunities
export type GetCommunitiesResult = {
  communities: {
    id: string;
    name: string;
    description: string;
  }[];
};

export type GetCommunitiesVariables = Record<string, never>;

export const GET_COMMUNITIES_QUERY: TypedDocumentNode<GetCommunitiesResult, GetCommunitiesVariables> = gql`
  query GetCommunities {
    communities {
      id
      name
      description
    }
  }
`;

export type GetFavoriteCommunitiesByUserResult = {
  userMemberCommunities: {
    id: string;
    name: string;
    description: string;
  }[];
};

export type GetFavoriteCommunitiesByUserVariables = {
  userId: string;
};

export const GET_FAVORITE_COMMUNITIES_BY_USER_QUERY: TypedDocumentNode<
  GetFavoriteCommunitiesByUserResult,
  GetFavoriteCommunitiesByUserVariables
> = gql`
  query GetFavoriteCommunitiesByUser($userId: ID!) {
    userMemberCommunities(userId: $userId) {
      id
      name
      description
    }
  }
`;

// Mutation: JoinCommunity
export type JoinCommunityResult = {
  joinCommunity: boolean;
};

export type JoinCommunityVariables = {
  communityId: string;
  userId: string;
};

export const JOIN_COMMUNITY_MUTATION: TypedDocumentNode<JoinCommunityResult, JoinCommunityVariables> = gql`
  mutation JoinCommunity($communityId: ID!, $userId: ID!) {
    joinCommunity(communityId: $communityId, userId: $userId)
  }
`;

// Mutation: CreateCommunityRequest
export type CreateCommunityRequestResult = {
  createCommunityRequest: string;
};

export type CreateCommunityRequestVariables = {
  createCommunityRequestInput: {
    name: string;
    description: string;
    causeCreationRequests: {
      name: string;
      description: string;
      ods: string[];
      initialDate: string;
      durationDays: number;
    }[];
    userId: string;
  };
};

export const CREATE_COMMUNITY_REQUEST_MUTATION: TypedDocumentNode<
  CreateCommunityRequestResult,
  CreateCommunityRequestVariables
> = gql`
  mutation CreateCommunityRequest($createCommunityRequestInput: CreateCommunityRequestInput!) {
    createCommunityRequest(createCommunityRequestInput: $createCommunityRequestInput)
  }
`;
