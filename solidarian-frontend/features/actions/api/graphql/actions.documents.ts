import { gql, TypedDocumentNode } from '@apollo/client';

// Query: GetAction
export type GetActionResult = {
  action: {
    id: string;
    name: string;
    description: string;
    causeId: string;
    objectives: {
      name: string;
      description: string;
      unit: string;
      quantity: number;
      currentAmount: number;
    }[];
    events: {
      id: string;
      name: string;
      description: string;
      initialDate: number;
      assistantIds: string[];
      place: {
        direction: string;
        city: string;
        countryCode: string;
      };
    }[];
  };
};

export type GetActionVariables = {
  id: string;
};

export const GET_ACTION_QUERY: TypedDocumentNode<GetActionResult, GetActionVariables> = gql`
  query GetAction($id: ID!) {
    action(id: $id) {
      id
      name
      description
      causeId
      objectives {
        name
        description
        unit
        quantity
        currentAmount
      }
      events {
        id
        name
        description
        initialDate
        assistantIds
        place {
          direction
          city
          countryCode
        }
      }
    }
  }
`;

// Mutation: CreateActionRequest
export type CreateActionRequestResult = {
  createActionRequest: string;
};

export type CreateActionRequestVariables = {
  createActionRequestInput: {
    name: string;
    description: string;
    objectives: {
      name: string;
      description: string;
      quantity: number;
      unit: string;
    }[];
    events: {
      name: string;
      description: string;
      initialDate: string;
      place: {
        direction: string;
        city: string;
        countryCode: string;
      };
    }[];
    userId: string;
    causeId: string;
  };
};

export const CREATE_ACTION_REQUEST_MUTATION: TypedDocumentNode<
  CreateActionRequestResult,
  CreateActionRequestVariables
> = gql`
  mutation CreateActionRequest($createActionRequestInput: CreateActionRequestInput!) {
    createActionRequest(createActionRequestInput: $createActionRequestInput)
  }
`;

// Mutation: JoinEvent
export type JoinEventResult = {
  joinEvent: boolean;
};

export type JoinEventVariables = {
  eventId: string;
  userId: string;
};

export const JOIN_EVENT_MUTATION: TypedDocumentNode<JoinEventResult, JoinEventVariables> = gql`
  mutation JoinEvent($eventId: ID!, $userId: ID!) {
    joinEvent(eventId: $eventId, userId: $userId)
  }
`;

// Mutation: LeaveEvent
export type LeaveEventResult = {
  leaveEvent: boolean;
};

export type LeaveEventVariables = {
  eventId: string;
  userId: string;
};

export const LEAVE_EVENT_MUTATION: TypedDocumentNode<LeaveEventResult, LeaveEventVariables> = gql`
  mutation LeaveEvent($eventId: ID!, $userId: ID!) {
    leaveEvent(eventId: $eventId, userId: $userId)
  }
`;

// Mutation: ContributeObjective
export type ContributeObjectiveResult = {
  contributeObjective: {
    name: string;
    description: string;
    unit: string;
    quantity: number;
    currentAmount: number;
  };
};

export type ContributeObjectiveVariables = {
  actionId: string;
  objectiveName: string;
  userId: string;
  amount: number;
};

export const CONTRIBUTE_OBJECTIVE_MUTATION: TypedDocumentNode<ContributeObjectiveResult, ContributeObjectiveVariables> =
  gql`
    mutation ContributeObjective($actionId: ID!, $objectiveName: String!, $userId: ID!, $amount: Int!) {
      contributeObjective(actionId: $actionId, objectiveName: $objectiveName, userId: $userId, amount: $amount) {
        name
        description
        unit
        quantity
        currentAmount
      }
    }
  `;

// Subscription: ActionCreated
export type ActionCreatedResult = {
  actionCreated: {
    id: string;
    name: string;
    description: string;
    causeId: string;
    communityId: string;
  };
};

export type ActionCreatedVariables = {
  causeId: string;
};

export const ACTION_CREATED_SUBSCRIPTION: TypedDocumentNode<ActionCreatedResult, ActionCreatedVariables> = gql`
  subscription ActionCreated($causeId: ID!) {
    actionCreated(causeId: $causeId) {
      id
      name
      description
      causeId
      communityId
    }
  }
`;
