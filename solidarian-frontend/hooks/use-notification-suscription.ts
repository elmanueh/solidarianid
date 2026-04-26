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
import { Notification } from '@/features/repository/entities/notification';
import notificationsRepository from '@/features/repository/notifications-dexie.repository';
import { useApolloClient } from '@apollo/client/react';
import { useCallback, useEffect, useRef } from 'react';
import {
  fetchUserSubscriptions,
  toActionCreatedNotification,
  toCauseCreatedNotification,
  toRequestStatusNotification,
} from './helpers/use-notification-suscription-helper';
import { NOTIFICATION_UPDATE_EVENT } from './use-notification-status';

interface UseNotificationSubscriptionsProps {
  userId: string;
  enabled?: boolean;
}

export function useNotificationSubscriptions({ userId, enabled = true }: UseNotificationSubscriptionsProps): void {
  const apolloClient = useApolloClient();
  const subscriptionsRef = useRef<Array<{ unsubscribe: () => void }>>([]);
  const activeUserIdRef = useRef<string | null>(null);

  const saveNotificationToDexie = useCallback(async (notification: Notification): Promise<void> => {
    try {
      await notificationsRepository.save(notification);
      globalThis.dispatchEvent(new Event(NOTIFICATION_UPDATE_EVENT));
    } catch (error) {
      console.error('Error saving notification to Dexie:', error);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !userId) {
      return;
    }

    if (activeUserIdRef.current === userId && subscriptionsRef.current.length > 0) {
      return;
    }

    subscriptionsRef.current.forEach(subscription => subscription.unsubscribe());
    subscriptionsRef.current = [];
    activeUserIdRef.current = userId;

    const graphql = new GraphqlClientService(apolloClient);
    let isCancelled = false;

    const startSubscriptions = async (): Promise<void> => {
      const subscriptions: Array<{ unsubscribe: () => void }> = [];

      const requestSubscription = graphql.subscribe(REQUEST_STATUS_CHANGED_SUBSCRIPTION, { userId }).subscribe({
        next: async (result: { data: RequestStatusChangedResult | undefined }) => {
          if (result.data?.requestStatusChanged) {
            const event = result.data.requestStatusChanged;

            if (event.status === 'APPROVED' || event.status === 'REJECTED') {
              const notification = toRequestStatusNotification(event);
              await saveNotificationToDexie(notification);
            }
          }
        },
        error: (error: Error) => {
          console.error('requestStatusChanged subscription error:', error);
        },
      });

      subscriptions.push({ unsubscribe: () => requestSubscription.unsubscribe() });

      try {
        const data = await fetchUserSubscriptions('', userId, {
          includeRequestIds: true,
          requestStatus: 'pending',
          includeEventIds: false,
          includeObjectiveIds: false,
          includeFollowedCauseIds: true,
          includeFollowedCommunityIds: true,
        });
        const followedCommunityIds = Array.from(new Set(data.followedCommunityIds));
        const followedCauseIds = Array.from(new Set(data.followedCauseIds));

        for (const communityId of followedCommunityIds) {
          const causeSubscription = graphql.subscribe(CAUSE_CREATED_SUBSCRIPTION, { communityId }).subscribe({
            next: async (result: { data: CauseCreatedResult | undefined }) => {
              if (result.data?.causeCreated) {
                const notification = toCauseCreatedNotification(result.data.causeCreated, userId);
                await saveNotificationToDexie(notification);
              }
            },
            error: (error: Error) => {
              console.error('causeCreated subscription error:', error);
            },
          });

          subscriptions.push({ unsubscribe: () => causeSubscription.unsubscribe() });
        }

        for (const causeId of followedCauseIds) {
          const actionSubscription = graphql.subscribe(ACTION_CREATED_SUBSCRIPTION, { causeId }).subscribe({
            next: async (result: { data: ActionCreatedResult | undefined }) => {
              if (result.data?.actionCreated) {
                const notification = toActionCreatedNotification(result.data.actionCreated, userId);
                await saveNotificationToDexie(notification);
              }
            },
            error: (error: Error) => {
              console.error('actionCreated subscription error:', error);
            },
          });

          subscriptions.push({ unsubscribe: () => actionSubscription.unsubscribe() });
        }
      } catch (error) {
        console.error('Error loading subscriptions for notifications:', error);
      }

      if (isCancelled) {
        subscriptions.forEach(subscription => subscription.unsubscribe());
        return;
      }

      subscriptionsRef.current = subscriptions;
    };

    void startSubscriptions();

    return () => {
      isCancelled = true;
      subscriptionsRef.current.forEach(subscription => subscription.unsubscribe());
      subscriptionsRef.current = [];
      activeUserIdRef.current = null;
    };
  }, [userId, enabled, apolloClient, saveNotificationToDexie]);
}
