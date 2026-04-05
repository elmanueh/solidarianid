import { gql } from "@apollo/client";

export const REQUEST_FIELDS_FRAGMENT = gql`
  fragment RequestFields on Request {
    id
    type
    name
    description
    status
    reason
    userId
  }
`;

export const GET_REQUEST_QUERY = gql`
  query GetRequest($id: ID!) {
    request(id: $id) {
      ...RequestFields
    }
  }
  ${REQUEST_FIELDS_FRAGMENT}
`;

export const REQUEST_STATUS_CHANGED_SUBSCRIPTION = gql`
  subscription RequestStatusChanged($userId: ID!) {
    requestStatusChanged(userId: $userId) {
      id
      type
      name
      description
      status
      reason
      userId
      createdEntityId
    }
  }
`;
