export const CAUSES_GRAPHQL_OPERATION_NAMES = {
  GET_CAUSES: "GetCauses",
  GET_CAUSE: "GetCause",
  GET_CAUSES_BY_COMMUNITY: "GetCausesByCommunity",
  GET_CAUSE_BY_COMMUNITY: "GetCauseByCommunity",
  JOIN_CAUSE: "JoinCause",
  CREATE_CAUSE_REQUEST: "CreateCauseRequest",
  CAUSE_CREATED: "CauseCreated",
} as const;

export const CAUSES_GRAPHQL_ROOT_FIELDS = {
  CAUSES: "causes",
  CAUSE: "cause",
  CAUSES_BY_COMMUNITY: "causesByCommunity",
  CAUSE_BY_COMMUNITY: "causeByCommunity",
  JOIN_CAUSE: "joinCause",
  CREATE_CAUSE_REQUEST: "createCauseRequest",
  CAUSE_CREATED: "causeCreated",
} as const;
