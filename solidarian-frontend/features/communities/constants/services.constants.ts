import type { FetchPolicy } from "@apollo/client";

export const COMMUNITIES_SERVICE_NAME = "communitiesService";
export const REQUESTS_SERVICE_NAME = "requestsService";

export const COMMUNITIES_QUERY_FETCH_POLICY: FetchPolicy = "network-only";

export const COMMUNITIES_SERVICE_ERRORS = {
  GET_COMMUNITIES: "Unable to fetch communities",
  GET_COMMUNITY: "Unable to fetch community",
  JOIN_COMMUNITY: "Unable to join community",
  CREATE_COMMUNITY_REQUEST: "Unable to create community request",
  GET_REQUEST: "Unable to fetch request",
  REQUEST_STATUS_CHANGED: "Unable to subscribe to request status changes",
} as const;
