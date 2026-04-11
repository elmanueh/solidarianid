import axios from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error?.message || `Error de red: ${err.code}`;
  }

  if (err instanceof Error) return err.message;

  return 'Error desconocido';
};
