import type { FetchPolicy } from "@apollo/client";

export const ACTIONS_SERVICE_NAME = "actionsService";

export const ACTIONS_QUERY_FETCH_POLICY: FetchPolicy = "network-only";

export const ACTIONS_SERVICE_ERRORS = {
  GET_ACTIONS: "Unable to fetch actions",
  GET_ACTION: "Unable to fetch action",
  CREATE_ACTION_REQUEST: "Unable to create action request",
  ACTION_CREATED: "Unable to subscribe to action creation",
} as const;
