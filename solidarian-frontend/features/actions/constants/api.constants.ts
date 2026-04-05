export const ACTIONS_GRAPHQL_OPERATION_NAMES = {
  GET_ACTIONS: "GetActions",
  GET_ACTION: "GetAction",
  CREATE_ACTION_REQUEST: "CreateActionRequest",
  ACTION_CREATED: "ActionCreated",
} as const;

export const ACTIONS_GRAPHQL_ROOT_FIELDS = {
  ACTIONS: "actions",
  ACTION: "action",
  CREATE_ACTION_REQUEST: "createActionRequest",
  ACTION_CREATED: "actionCreated",
} as const;
