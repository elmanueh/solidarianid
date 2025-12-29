/**
 * Metadatos de paginación
 */
export class PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  constructor(page: number, limit: number, total: number, totalPages: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = totalPages;
    this.hasNext = page < totalPages;
    this.hasPrev = page > 1;
  }
}

/**
 * DTO genérico para respuestas paginadas
 * Envuelve los datos con metadatos de paginación
 */
export class PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationMetadata;

  constructor(data: T[], page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    this.data = data;
    this.pagination = new PaginationMetadata(page, limit, total, totalPages);
  }
}
