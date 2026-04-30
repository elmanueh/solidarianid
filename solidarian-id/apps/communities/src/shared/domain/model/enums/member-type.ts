/**
 * Enum that represents the lifecycle state of a request.
 */
export enum MemberType {
  /** Person who created the community */
  CREATOR = 'creator',

  /** Person who can send request for causes and actions */
  ADMIN = 'admin',

  /** Normal persons */
  MEMBER = 'member',
}
