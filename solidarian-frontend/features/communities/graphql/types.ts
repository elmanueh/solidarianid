export type CauseByCommunityVariables = {
  communityId: string;
  causeId: string;
};

export type CauseByCommunityResponse = {
  causeByCommunity: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    initialDate: string;
    ods: number[];
    userIds: string[];
    actions: {
      id: string;
      name: string;
      description: string;
      objectives: {
        name: string;
      }[];
      events: {
        id: string;
      }[];
    }[];
  } | null;
};
