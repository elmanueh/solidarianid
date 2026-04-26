import { CombinedGraphQLErrors } from '@apollo/client/errors';

const ENTITY_NOT_FOUND_MESSAGE = 'was not found';

export const isEntityNotFoundGraphQLError = (error: unknown): boolean => {
  return getErrorMessages(error).some(message => message.toLowerCase().includes(ENTITY_NOT_FOUND_MESSAGE));
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
