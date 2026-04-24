import { RequestStatus, RequestType } from '@/features/communities/constants/requests.model';
import { gql, TypedDocumentNode } from '@apollo/client';

export type GetRequestsByUserIdResult = {
  getRequestsByUserId: {
    id: string;
    type: RequestType;
    name: string;
    description: string;
    status: RequestStatus;
    reason?: string | null;
    userId: string;
  }[];
};

export type GetRequestsByUserIdVariables = {
  userId: string;
};

export const GET_REQUESTS_BY_USER_ID_QUERY: TypedDocumentNode<GetRequestsByUserIdResult, GetRequestsByUserIdVariables> =
  gql`
    query GetRequestsByUserId($userId: ID!) {
      getRequestsByUserId(userId: $userId) {
        id
        type
        name
        description
        status
        reason
        userId
      }
    }
  `;

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
