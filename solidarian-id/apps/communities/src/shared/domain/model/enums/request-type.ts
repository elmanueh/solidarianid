/**
 * Defines the different types of requests supported by the solidarity platform.
 */
export enum RequestType {
  /** Request related to a solidarity cause created within a community. */
  CAUSE = 'cause',

  /** Request related to a community of users. */
  COMMUNITY = 'community',

  /** Request related to a concrete solidarity action carried out to support a cause. */
  ACTION = 'action',
}
