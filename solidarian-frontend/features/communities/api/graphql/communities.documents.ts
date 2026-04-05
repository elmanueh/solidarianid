import { gql } from "@apollo/client";

export const COMMUNITY_USER_FIELDS_FRAGMENT = gql`
  fragment CommunityUserFields on User {
    id
    fullName
    email
    mobilePhone
  }
`;

export const COMMUNITY_CAUSE_FIELDS_FRAGMENT = gql`
  fragment CommunityCauseFields on Cause {
    id
    name
    description
    durationDays
    ods
    initialDate
    communityId
    userIds
  }
`;

export const GET_COMMUNITIES_QUERY = gql`
  query GetCommunities {
    communities {
      id
      name
      description
      creator {
        ...CommunityUserFields
      }
      admins {
        ...CommunityUserFields
      }
      members {
        ...CommunityUserFields
      }
      causes {
        ...CommunityCauseFields
      }
    }
  }
  ${COMMUNITY_USER_FIELDS_FRAGMENT}
  ${COMMUNITY_CAUSE_FIELDS_FRAGMENT}
`;

export const GET_COMMUNITY_QUERY = gql`
  query GetCommunity($id: ID!) {
    community(id: $id) {
      id
      name
      description
      creator {
        ...CommunityUserFields
      }
      admins {
        ...CommunityUserFields
      }
      members {
        ...CommunityUserFields
      }
      causes {
        ...CommunityCauseFields
      }
    }
  }
  ${COMMUNITY_USER_FIELDS_FRAGMENT}
  ${COMMUNITY_CAUSE_FIELDS_FRAGMENT}
`;

export const JOIN_COMMUNITY_MUTATION = gql`
  mutation JoinCommunity($communityId: ID!, $userId: ID!) {
    joinCommunity(communityId: $communityId, userId: $userId)
  }
`;

export const CREATE_COMMUNITY_REQUEST_MUTATION = gql`
  mutation CreateCommunityRequest(
    $createCommunityRequestInput: CreateCommunityRequestInput!
  ) {
    createCommunityRequest(
      createCommunityRequestInput: $createCommunityRequestInput
    )
  }
`;
