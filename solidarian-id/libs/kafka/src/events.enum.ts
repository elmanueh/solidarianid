export enum EventType {
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',

  REQUEST_CREATED = 'request.created',
  REQUEST_ACCEPTED = 'request.accepted',
  REQUEST_DECLINED = 'request.declined',

  COMMUNITY_CREATED = 'community.created',
  COMMUNITY_DELETED = 'community.deleted',
  COMMUNITY_MEMBER_JOINED = 'community.member_joined',

  CAUSE_CREATED = 'cause.created',
  CAUSE_UPDATED = 'cause.updated',
  CAUSE_DELETED = 'cause.deleted',

  ACTION_CREATED = 'action.created',
  ACTION_UPDATED = 'action.updated',
  ACTION_DELETED = 'action.deleted',
}
