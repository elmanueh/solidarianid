import { ACTION_FIELDS_FRAGMENT } from "@/features/actions/api";
import { gql } from "@apollo/client";

export const CAUSE_FIELDS_FRAGMENT = gql`
  fragment CauseFields on Cause {
    id
    name
    description
    durationDays
    ods
    initialDate
    actions {
      ...ActionFields
    }
    communityId
    userIds
  }
  ${ACTION_FIELDS_FRAGMENT}
`;

export const GET_CAUSES_QUERY = gql`
  query GetCauses {
    causes {
      ...CauseFields
    }
  }
  ${CAUSE_FIELDS_FRAGMENT}
`;

export const GET_CAUSE_QUERY = gql`
  query GetCause($id: ID!) {
    cause(id: $id) {
      ...CauseFields
    }
  }
  ${CAUSE_FIELDS_FRAGMENT}
`;

export const GET_CAUSES_BY_COMMUNITY_QUERY = gql`
  query GetCausesByCommunity($communityId: ID!) {
    causesByCommunity(communityId: $communityId) {
      ...CauseFields
    }
  }
  ${CAUSE_FIELDS_FRAGMENT}
`;

export const GET_CAUSE_BY_COMMUNITY_QUERY = gql`
  query GetCauseByCommunity($communityId: ID!, $causeId: ID!) {
    causeByCommunity(communityId: $communityId, causeId: $causeId) {
      ...CauseFields
    }
  }
  ${CAUSE_FIELDS_FRAGMENT}
`;

export const JOIN_CAUSE_MUTATION = gql`
  mutation JoinCause($causeId: ID!, $userId: ID!) {
    joinCause(causeId: $causeId, userId: $userId)
  }
`;

export const CREATE_CAUSE_REQUEST_MUTATION = gql`
  mutation CreateCauseRequest($createCauseRequestInput: CreateCauseRequestInput!) {
    createCauseRequest(createCauseRequestInput: $createCauseRequestInput)
  }
`;

export const CAUSE_CREATED_SUBSCRIPTION = gql`
  subscription CauseCreated($communityId: ID!) {
    causeCreated(communityId: $communityId) {
      ...CauseFields
    }
  }
  ${CAUSE_FIELDS_FRAGMENT}
`;
