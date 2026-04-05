export const JOIN_CAUSE_MUTATION = `
  mutation joinCause($causeId: ID!, $userId: ID!) {
    joinCause(causeId: $causeId, userId: $userId)
  }
`;
