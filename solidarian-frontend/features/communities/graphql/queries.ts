export const GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID = `
  query causeByCommunity($communityId: ID!, $causeId: ID!) {
    causeByCommunity(communityId: $communityId, causeId: $causeId) {
      id
      name
      description
      durationDays
      initialDate
      ods
      userIds
      actions {
        id
        name
        description
        objectives {
          name
        }
        events {
          id
        }
      }
    }
  }
`;
