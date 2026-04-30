import { CombinedGraphQLErrors } from '@apollo/client/errors';

const ENTITY_NOT_FOUND_MESSAGES = ['was not found', 'not found'];

export const isEntityNotFoundGraphQLError = (error: unknown): boolean => {
  return getErrorMessages(error).some(message =>
    ENTITY_NOT_FOUND_MESSAGES.some(pattern => message.toLowerCase().includes(pattern))
  );
};

const getErrorMessages = (error: unknown): string[] => {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.map(({ message }) => message);
  }

  if (error instanceof Error) {
    return [error.message];
  }

  return [];
};
