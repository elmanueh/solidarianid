export const JOIN_CAUSE_MUTATION = `
  mutation joinCause($causeId: ID!, $userId: ID!) {
    joinCause(causeId: $causeId, userId: $userId)
  }
`;

export const LEAVE_CAUSE_MUTATION = `
  mutation leaveCause($causeId: ID!, $userId: ID!) {
    leaveCause(causeId: $causeId, userId: $userId)
  }
`;
