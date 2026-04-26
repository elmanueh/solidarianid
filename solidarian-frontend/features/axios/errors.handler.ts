import axios from 'axios';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

const FORBIDDEN_MESSAGE = 'No tienes permiso para realizar esta acción';

const normalizeMessage = (message?: string): string => {
  if (!message) {
    return 'Error desconocido';
  }

  const normalized = message.toLowerCase();

  if (normalized.includes('forbidden by authorization policy') || normalized === 'forbidden') {
    return FORBIDDEN_MESSAGE;
  }

  return message;
};

export const getErrorMessage = (err: unknown): string => {
  if (CombinedGraphQLErrors.is(err)) {
    return normalizeMessage(err.errors[0]?.message);
  }

  if (axios.isAxiosError(err)) {
    return normalizeMessage(err.response?.data?.error?.message) || `Error de red: ${err.code}`;
  }

  if (err instanceof Error) {
    return normalizeMessage(err.message);
  }

  return 'Error desconocido';
};
