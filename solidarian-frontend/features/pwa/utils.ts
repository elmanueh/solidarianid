import { StoredNotificationData } from '@/features/pwa/types/payload.type';

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = globalThis.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const registration = await globalThis.navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  const registration = await globalThis.navigator.serviceWorker.ready;
  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY || ''),
  });

  return sub;
}

export async function unsubscribeFromPush(subscription: PushSubscription | null): Promise<void> {
  await subscription?.unsubscribe();
}

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
