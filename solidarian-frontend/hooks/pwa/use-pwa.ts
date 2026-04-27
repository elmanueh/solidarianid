import { getCurrentPushSubscription, subscribeToPush, unsubscribeFromPush } from '@/features/pwa/utils';
import { useEffect, useMemo, useState } from 'react';

function encodePushKey(key: ArrayBuffer | null): string {
  if (!key) {
    throw new Error('Push subscription key is missing');
  }

  const bytes = new Uint8Array(key);
  let binary = '';

  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return globalThis.btoa(binary);
}

async function registerSubscriptionInBackend(subscription: PushSubscription): Promise<void> {
  const p256dh = encodePushKey(subscription.getKey('p256dh'));
  const auth = encodePushKey(subscription.getKey('auth'));

  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      p256dh,
      auth,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudo registrar la suscripción push.');
  }
}

async function unregisterSubscriptionInBackend(endpoint: string): Promise<void> {
  const response = await fetch(`/api/subscriptions/${encodeURIComponent(endpoint)}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudo eliminar la suscripción push.');
  }
}

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
    if (!isSupported) {
      throw new Error('Push notifications are not supported in this browser.');
    }

    const currentSubscription = await getCurrentPushSubscription();
    const sub = currentSubscription ?? (await subscribeToPush());

    if (!sub) {
      throw new Error('No se pudo crear la suscripción push.');
    }

    await registerSubscriptionInBackend(sub);
    setSubscription(sub);
  }

  async function unsubscribe() {
    if (!isSupported) {
      return;
    }

    const currentSubscription = subscription ?? (await getCurrentPushSubscription());

    if (!currentSubscription) {
      return;
    }

    await unregisterSubscriptionInBackend(currentSubscription.endpoint);
    await unsubscribeFromPush(currentSubscription);
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
