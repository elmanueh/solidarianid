import type { FetchPolicy } from "@apollo/client";

export const CAUSES_SERVICE_NAME = "causesService";

export const CAUSES_QUERY_FETCH_POLICY: FetchPolicy = "network-only";

export const CAUSES_SERVICE_ERRORS = {
  GET_CAUSES: "Unable to fetch causes",
  GET_CAUSE: "Unable to fetch cause",
  GET_CAUSES_BY_COMMUNITY: "Unable to fetch causes by community",
  GET_CAUSE_BY_COMMUNITY: "Unable to fetch cause by community",
  JOIN_CAUSE: "Unable to join cause",
  CREATE_CAUSE_REQUEST: "Unable to create cause request",
  CAUSE_CREATED: "Unable to subscribe to cause creation",
} as const;
