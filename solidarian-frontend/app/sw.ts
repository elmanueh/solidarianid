/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultCache } from '@serwist/turbopack/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { NetworkOnly, Serwist } from 'serwist';
import { PushNotificationPayload, StoredNotificationData } from '../features/pwa/types/payload.type';
import { getNotificationUrl } from '../features/pwa/utils';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher({ request }) {
        return request.method !== 'GET';
      },
      handler: new NetworkOnly(),
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
});

serwist.addEventListeners();

self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) {
    return;
  }

  const payload = event.data.json() as PushNotificationPayload;

  const notificationData: StoredNotificationData = {
    ...(payload.data ?? {}),
    type: payload.type,
  };

  const options: NotificationOptions = {
    body: payload.message,
    tag: payload.type,
    icon: '/solidarian-logo.png',
    badge: '/badge.png',
    data: notificationData,
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  const notification = event.notification;
  const data = notification.data as StoredNotificationData | undefined;

  notification.close();

  const urlToOpen = getNotificationUrl(data);

  event.waitUntil(openOrFocusWindow(urlToOpen));
});

async function openOrFocusWindow(urlToOpen: string): Promise<WindowClient | null | undefined> {
  const clientList = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (const client of clientList) {
    const clientUrl = new URL(client.url);

    if (clientUrl.pathname === urlToOpen && 'focus' in client) {
      return client.focus();
    }
  }

  if (self.clients.openWindow) {
    return self.clients.openWindow(urlToOpen);
  }

  return undefined;
}
