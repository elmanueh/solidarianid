import { gql } from "@apollo/client";

export const EVENT_PLACE_FIELDS_FRAGMENT = gql`
  fragment EventPlaceFields on EventPlace {
    direction
    city
    countryCode
  }
`;

export const EVENT_FIELDS_FRAGMENT = gql`
  fragment EventFields on Event {
    id
    name
    description
    initialDate
    place {
      ...EventPlaceFields
    }
  }
  ${EVENT_PLACE_FIELDS_FRAGMENT}
`;

export const OBJECTIVE_FIELDS_FRAGMENT = gql`
  fragment ObjectiveFields on Objective {
    name
    description
    unit
    quantity
    currentAmount
  }
`;

export const ACTION_FIELDS_FRAGMENT = gql`
  fragment ActionFields on Action {
    id
    name
    description
    objectives {
      ...ObjectiveFields
    }
    events {
      ...EventFields
    }
    causeId
  }
  ${OBJECTIVE_FIELDS_FRAGMENT}
  ${EVENT_FIELDS_FRAGMENT}
`;

export const GET_ACTIONS_QUERY = gql`
  query GetActions {
    actions {
      ...ActionFields
    }
  }
  ${ACTION_FIELDS_FRAGMENT}
`;

export const GET_ACTION_QUERY = gql`
  query GetAction($id: ID!) {
    action(id: $id) {
      ...ActionFields
    }
  }
  ${ACTION_FIELDS_FRAGMENT}
`;

export const CREATE_ACTION_REQUEST_MUTATION = gql`
  mutation CreateActionRequest($createActionRequestInput: CreateActionRequestInput!) {
    createActionRequest(createActionRequestInput: $createActionRequestInput)
  }
`;

export const ACTION_CREATED_SUBSCRIPTION = gql`
  subscription ActionCreated($causeId: ID!) {
    actionCreated(causeId: $causeId) {
      ...ActionFields
    }
  }
  ${ACTION_FIELDS_FRAGMENT}
`;
