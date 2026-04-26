import { getCurrentPushSubscription, subscribeToPush, unsubscribeFromPush } from '@/features/pwa/utils';
import { useEffect, useMemo, useState } from 'react';

export function usePwa() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  const isSupported = useMemo(() => {
    return (
      typeof globalThis !== 'undefined' &&
      typeof globalThis.navigator !== 'undefined' &&
      'serviceWorker' in globalThis.navigator &&
      'PushManager' in globalThis &&
      'Notification' in globalThis
    );
  }, []);

  const isIOS = useMemo(() => {
    const navigator = globalThis.navigator;

    if (!navigator) return false;

    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }, []);

  useEffect(() => {
    async function loadPwaState() {
      if (!isSupported) return;

      setPermission(globalThis.Notification.permission);

      const sub = await getCurrentPushSubscription();
      setSubscription(sub);
    }

    loadPwaState();
  }, [isSupported]);

  async function subscribe() {
    const sub = await subscribeToPush();
    setSubscription(sub);
  }

  async function unsubscribe() {
    if (!subscription) return;

    await unsubscribeFromPush(subscription);
    setSubscription(null);
  }

  async function requestNotificationPermission() {
    if (!isSupported) return 'denied';

    const result = await globalThis.Notification.requestPermission();
    setPermission(result);

    return result;
  }

  return {
    isSupported,
    isIOS,
    subscription,
    permission,
    subscribe,
    unsubscribe,
    requestNotificationPermission,
  };
}
