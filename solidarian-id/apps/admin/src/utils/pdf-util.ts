export function validatePageNumber(page?: string): number {
  if (!page) return 1;

  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return -1;
  }

  return pageNumber;
}
