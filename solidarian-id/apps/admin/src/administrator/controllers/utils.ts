/**
 * Valida el número de página del query param
 * @param page Query param page (string)
 * @returns Número de página válido o -1 si es inválido
 */
export function validatePageNumber(page?: string): number {
  if (!page) return 1; // Default a página 1

  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return -1; // Inválido
  }

  return pageNumber;
}
