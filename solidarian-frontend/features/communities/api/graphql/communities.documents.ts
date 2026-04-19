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

// Query: GetCommunityById
export type GetCommunityByIdResult = {
  community: {
    id: string;
    name: string;
    description: string;
    creator: {
      id: string;
      fullName: string;
    };
    admins: {
      id: string;
      fullName: string;
    }[];
    members: {
      id: string;
      fullName: string;
    }[];
    causes: {
      id: string;
      name: string;
      description: string;
      durationDays: number;
      ods: string[];
    }[];
  };
};

export type GetCommunityByIdVariables = {
  id: string;
};

export const GET_COMMUNITY_BY_ID_QUERY: TypedDocumentNode<GetCommunityByIdResult, GetCommunityByIdVariables> = gql`
  query Community($id: ID!) {
    community(id: $id) {
      id
      name
      description
      creator {
        id
        fullName
      }
      admins {
        id
        fullName
      }
      members {
        id
        fullName
      }
      causes {
        id
        name
        description
        durationDays
        ods
      }
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

// Mutation: LeaveCommunity
export type LeaveCommunityResult = {
  leaveCommunity: boolean;
};

export type LeaveCommunityVariables = {
  communityId: string;
  userId: string;
};

export const LEAVE_COMMUNITY_MUTATION: TypedDocumentNode<LeaveCommunityResult, LeaveCommunityVariables> = gql`
  mutation LeaveCommunity($communityId: ID!, $userId: ID!) {
    leaveCommunity(communityId: $communityId, userId: $userId)
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
