export const COMMUNITIES_GRAPHQL_OPERATION_NAMES = {
  GET_COMMUNITIES: "GetCommunities",
  GET_COMMUNITY: "GetCommunity",
  GET_REQUEST: "GetRequest",
  JOIN_COMMUNITY: "JoinCommunity",
  CREATE_COMMUNITY_REQUEST: "CreateCommunityRequest",
  REQUEST_STATUS_CHANGED: "RequestStatusChanged",
} as const;

export const COMMUNITIES_GRAPHQL_ROOT_FIELDS = {
  COMMUNITIES: "communities",
  COMMUNITY: "community",
  REQUEST: "request",
  JOIN_COMMUNITY: "joinCommunity",
  CREATE_COMMUNITY_REQUEST: "createCommunityRequest",
  REQUEST_STATUS_CHANGED: "requestStatusChanged",
} as const;
