import { Community, CreateCommunityRequestInput } from '@/features/communities/model/communities.model';
import { gql, TypedDocumentNode } from '@apollo/client';

// Query: GetCommunities
export type GetCommunitiesResult = {
  communities: Community[];
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
  createCommunityRequestInput: CreateCommunityRequestInput;
};

export const CREATE_COMMUNITY_REQUEST_MUTATION: TypedDocumentNode<
  CreateCommunityRequestResult,
  CreateCommunityRequestVariables
> = gql`
  mutation CreateCommunityRequest($createCommunityRequestInput: CreateCommunityRequestInput!) {
    createCommunityRequest(createCommunityRequestInput: $createCommunityRequestInput)
  }
`;
