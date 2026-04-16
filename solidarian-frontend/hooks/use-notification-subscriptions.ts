'use client';

import {
  ACTION_CREATED_SUBSCRIPTION,
  type ActionCreatedResult,
} from '@/features/actions/api/graphql/actions.documents';
import { CAUSE_CREATED_SUBSCRIPTION, type CauseCreatedResult } from '@/features/causes/api/graphql/causes.documents';
import {
  REQUEST_STATUS_CHANGED_SUBSCRIPTION,
  type RequestStatusChangedResult,
} from '@/features/communities/api/graphql/requests.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import type { UserSubscriptionsResponse } from '@/features/notifications/api/graphql/notifications.documents';
import { db } from '@/features/repository/db';
import { Notification, NotificationType } from '@/features/repository/entities/notification';
import { useApolloClient } from '@apollo/client/react';
import { useCallback, useEffect, useRef } from 'react';
import { NOTIFICATION_UPDATE_EVENT } from './use-notification-status';

interface UseNotificationSubscriptionsProps {
  userId: string;
  enabled?: boolean;
}

const DEBUG_NOTIFICATION_SUBSCRIPTIONS = process.env.NEXT_PUBLIC_DEBUG_NOTIFICATIONS === 'true';

const debugLog = (...args: unknown[]): void => {
  if (DEBUG_NOTIFICATION_SUBSCRIPTIONS) {
    console.log('[notifications-subscriptions]', ...args);
  }
};

export function useNotificationSubscriptions({ userId, enabled = true }: UseNotificationSubscriptionsProps): void {
  const apolloClient = useApolloClient();
  const subscriptionsRef = useRef<Array<{ unsubscribe: () => void }>>([]);
  const communitiesApiBase =
    process.env.NEXT_PUBLIC_COMMUNITIES_API_URL ??
    (
      process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ??
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
      'http://localhost:3002/graphql'
    )
      .replace(/\/$/, '')
      .replace(/\/graphql$/, '/api');

  const convertRequestStatusChangedToNotification = useCallback(
    (event: RequestStatusChangedResult['requestStatusChanged']): Notification => {
      const statusToTypeMap: Record<string, NotificationType> = {
        APPROVED: NotificationType.REQUEST_ACCEPTED,
        REJECTED: NotificationType.REQUEST_REJECTED,
        PENDING: NotificationType.REQUEST_ACCEPTED,
      };

      return {
        id: event.id,
        userId: event.userId,
        title: event.status === 'APPROVED' ? 'Solicitud aceptada' : 'Solicitud rechazada',
        message:
          event.status === 'APPROVED'
            ? `Tu solicitud ${event.name} ha sido aprobada.`
            : `Tu solicitud ${event.name} ha sido rechazada.`,
        read: false,
        createdAt: new Date(),
        type: statusToTypeMap[event.status] || NotificationType.REQUEST_ACCEPTED,
      };
    },
    []
  );

  const convertCauseCreatedToNotification = useCallback(
    (event: CauseCreatedResult['causeCreated']): Notification => {
      return {
        id: `cause-created-${event.id}`,
        userId,
        title: 'Nueva causa creada',
        message: `Se ha creado la causa ${event.name} en una comunidad que sigues.`,
        read: false,
        createdAt: new Date(),
        type: NotificationType.CAUSE_CREATED,
      };
    },
    [userId]
  );

  const convertActionCreatedToNotification = useCallback(
    (event: ActionCreatedResult['actionCreated']): Notification => {
      return {
        id: `action-created-${event.id}`,
        userId,
        title: 'Nueva accion creada',
        message: `Se ha creado la accion ${event.name} en una causa que sigues.`,
        read: false,
        createdAt: new Date(),
        type: NotificationType.ACTION_CREATED,
      };
    },
    [userId]
  );

  const saveNotificationToDexie = useCallback(async (notification: Notification): Promise<void> => {
    try {
      await db.notifications.add(notification);
      window.dispatchEvent(new Event(NOTIFICATION_UPDATE_EVENT));
    } catch (error) {
      console.error('Error saving notification to Dexie:', error);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !userId) {
      debugLog('skip start', { enabled, userIdPresent: Boolean(userId) });
      return;
    }

    debugLog('start', { userId, communitiesApiBase });

    const graphql = new GraphqlClientService(apolloClient);

    let isCancelled = false;

    const startSubscriptions = async (): Promise<void> => {
      const subscriptions: Array<{ unsubscribe: () => void }> = [];

      const requestSubscription = graphql.subscribe(REQUEST_STATUS_CHANGED_SUBSCRIPTION, { userId }).subscribe({
        next: async (result: { data: RequestStatusChangedResult | undefined }) => {
          if (result.data?.requestStatusChanged) {
            const event = result.data.requestStatusChanged;
            debugLog('event requestStatusChanged', {
              requestId: event.id,
              status: event.status,
              createdEntityId: event.createdEntityId,
            });
            if (event.status === 'APPROVED' || event.status === 'REJECTED') {
              const notification = convertRequestStatusChangedToNotification(event);
              await saveNotificationToDexie(notification);
            }
          }
        },
        error: (error: Error) => {
          console.error('requestStatusChanged subscription error:', error);
        },
        complete: () => {
          debugLog('requestStatusChanged subscription completed');
        },
      });

      subscriptions.push({ unsubscribe: () => requestSubscription.unsubscribe() });
      debugLog('subscribed requestStatusChanged', { userId });

      try {
        debugLog('loading user subscriptions', `${communitiesApiBase}/users/${userId}/subscriptions`);
        const response = await fetch(`${communitiesApiBase}/users/${userId}/subscriptions`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to load user subscriptions: ${response.status}`);
        }

        const data = (await response.json()) as UserSubscriptionsResponse;
        debugLog('user subscriptions loaded', {
          followedCommunityIds: data.followedCommunityIds,
          followedCauseIds: data.followedCauseIds,
          pendingRequestIds: data.pendingRequestIds,
        });

        for (const communityId of data.followedCommunityIds) {
          const causeSubscription = graphql.subscribe(CAUSE_CREATED_SUBSCRIPTION, { communityId }).subscribe({
            next: async (result: { data: CauseCreatedResult | undefined }) => {
              if (result.data?.causeCreated) {
                debugLog('event causeCreated', {
                  communityId,
                  causeId: result.data.causeCreated.id,
                  causeName: result.data.causeCreated.name,
                });
                const notification = convertCauseCreatedToNotification(result.data.causeCreated);
                await saveNotificationToDexie(notification);
              }
            },
            error: (error: Error) => {
              console.error('causeCreated subscription error:', error);
            },
            complete: () => {
              debugLog('causeCreated subscription completed', { communityId });
            },
          });

          subscriptions.push({ unsubscribe: () => causeSubscription.unsubscribe() });
          debugLog('subscribed causeCreated', { communityId });
        }

        for (const causeId of data.followedCauseIds) {
          const actionSubscription = graphql.subscribe(ACTION_CREATED_SUBSCRIPTION, { causeId }).subscribe({
            next: async (result: { data: ActionCreatedResult | undefined }) => {
              if (result.data?.actionCreated) {
                debugLog('event actionCreated', {
                  causeId,
                  actionId: result.data.actionCreated.id,
                  actionName: result.data.actionCreated.name,
                });
                const notification = convertActionCreatedToNotification(result.data.actionCreated);
                await saveNotificationToDexie(notification);
              }
            },
            error: (error: Error) => {
              console.error('actionCreated subscription error:', error);
            },
            complete: () => {
              debugLog('actionCreated subscription completed', { causeId });
            },
          });

          subscriptions.push({ unsubscribe: () => actionSubscription.unsubscribe() });
          debugLog('subscribed actionCreated', { causeId });
        }
      } catch (error) {
        console.error('Error loading subscriptions for notifications:', error);
      }

      if (isCancelled) {
        subscriptions.forEach(subscription => subscription.unsubscribe());
        return;
      }

      subscriptionsRef.current = subscriptions;
      debugLog('all subscriptions ready', { total: subscriptions.length });
    };

    void startSubscriptions();

    return () => {
      isCancelled = true;
      debugLog('cleanup subscriptions', { total: subscriptionsRef.current.length });
      subscriptionsRef.current.forEach(subscription => subscription.unsubscribe());
      subscriptionsRef.current = [];
    };
  }, [
    userId,
    enabled,
    apolloClient,
    communitiesApiBase,
    convertRequestStatusChangedToNotification,
    convertCauseCreatedToNotification,
    convertActionCreatedToNotification,
    saveNotificationToDexie,
  ]);
}
