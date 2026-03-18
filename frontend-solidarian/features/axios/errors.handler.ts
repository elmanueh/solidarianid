import axios from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) return `Error de red: ${err.code}`;

    const detail = err.response.data?.detail;
    return typeof detail === "string"
      ? detail
      : "Error al procesar la solicitud";
  }

  if (err instanceof Error) return err.message;

  return "Error desconocido";
};
