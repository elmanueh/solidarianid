import axios from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) return `Error de red: ${err.code}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData = err.response.data as any;

    const message =
      errorData?.error?.message || errorData?.detail || errorData?.message || 'Error al procesar la solicitud';

    return typeof message === 'string' ? message : 'Error al procesar la solicitud';
  }

  if (err instanceof Error) return err.message;

  return 'Error desconocido';
};
