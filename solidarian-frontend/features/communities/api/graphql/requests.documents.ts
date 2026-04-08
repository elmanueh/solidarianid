import { RequestStatusChangedEvent } from '@/features/communities/model/communities.model';
import { gql, TypedDocumentNode } from '@apollo/client';

// Subscription: RequestStatusChanged
export type RequestStatusChangedResult = {
  requestStatusChanged: RequestStatusChangedEvent;
};

export type RequestStatusChangedVariables = {
  userId: string;
};

export const REQUEST_STATUS_CHANGED_SUBSCRIPTION: TypedDocumentNode<
  RequestStatusChangedResult,
  RequestStatusChangedVariables
> = gql`
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
