import { Action, CreateActionRequestInput } from '@/features/actions/model/actions.model';
import { gql, TypedDocumentNode } from '@apollo/client';

// Mutation: CreateActionRequest
export type CreateActionRequestResult = {
  createActionRequest: string;
};

export type CreateActionRequestVariables = {
  createActionRequestInput: CreateActionRequestInput;
};

export const CREATE_ACTION_REQUEST_MUTATION: TypedDocumentNode<
  CreateActionRequestResult,
  CreateActionRequestVariables
> = gql`
  mutation CreateActionRequest($createActionRequestInput: CreateActionRequestInput!) {
    createActionRequest(createActionRequestInput: $createActionRequestInput)
  }
`;

// Subscription: ActionCreated
export type ActionCreatedResult = {
  actionCreated: Action;
};

export type ActionCreatedVariables = {
  causeId: string;
};

export const ACTION_CREATED_SUBSCRIPTION: TypedDocumentNode<ActionCreatedResult, ActionCreatedVariables> = gql`
  subscription ActionCreated($causeId: ID!) {
    actionCreated(causeId: $causeId) {
      ...ActionFields
    }
  }
`;
