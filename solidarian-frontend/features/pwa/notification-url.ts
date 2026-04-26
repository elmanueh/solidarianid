import { type StoredNotificationData } from '@/features/pwa/types/payload.type';

export function getNotificationUrl(data?: StoredNotificationData): string {
  if (!data) {
    return '/notifications';
  }

  switch (data.type) {
    case 'ACTION':
      if (data.communityId && data.actionId) {
        return `/communities/${data.communityId}/actions/${data.actionId}`;
      }
      return '/notifications';

    case 'CAUSE':
      if (data.communityId && data.causeId) {
        return `/communities/${data.communityId}/causes/${data.causeId}`;
      }
      return '/notifications';

    case 'REQUEST_STATUS_CHANGED':
      if (data.requestId) {
        return `/requests/${data.requestId}`;
      }
      return '/notifications';

    default:
      return '/notifications';
  }
}
