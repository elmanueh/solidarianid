export interface DomainError extends Error {
  errorMessage?: string;
  error?: any;
}
