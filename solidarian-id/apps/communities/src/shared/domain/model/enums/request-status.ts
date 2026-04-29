/**
 * Enum that represents the lifecycle state of a request.
 */
export enum RequestStatus {
  /** Request has been created but not yet reviewed */
  PENDING = 'pending',

  /** Request has been reviewed and approved */
  APPROVED = 'approved',

  /** Request has been reviewed and rejected */
  REJECTED = 'rejected',
}
