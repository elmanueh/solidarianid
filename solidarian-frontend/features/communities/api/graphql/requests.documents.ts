import { RequestStatus, RequestType } from '@/features/communities/constants/requests.model';
import { gql, TypedDocumentNode } from '@apollo/client';

// Subscription: RequestStatusChanged
export type RequestStatusChangedResult = {
  requestStatusChanged: {
    id: string;
    type: RequestType;
    name: string;
    description: string;
    status: RequestStatus;
    reason?: string | null;
    userId: string;
    createdEntityId?: string | null;
  };
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
