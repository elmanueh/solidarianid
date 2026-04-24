import type { ActionCreatedResult } from '@/features/actions/api/graphql/actions.documents';
import type { CauseCreatedResult } from '@/features/causes/api/graphql/causes.documents';
import type { RequestStatusChangedResult } from '@/features/communities/api/graphql/requests.documents';
import type { UserSubscriptionsResponse } from '@/features/notifications/api/graphql/notifications.documents';
import { Notification, NotificationType } from '@/features/repository/entities/notification';
import { ROUTES } from '@/features/routes';

interface UserSubscriptionsCriteria {
  requestType?: 'cause' | 'community' | 'action';
  requestStatus?: 'pending' | 'approved' | 'rejected';
  includeRequestIds?: boolean;
  includeFollowedCauseIds?: boolean;
  includeFollowedCommunityIds?: boolean;
  includeEventIds?: boolean;
  includeObjectiveIds?: boolean;
}

export async function fetchUserSubscriptions(
  communitiesApiBase: string,
  userId: string,
  criteria?: UserSubscriptionsCriteria
): Promise<UserSubscriptionsResponse> {
  const emptyResponse: UserSubscriptionsResponse = {
    requestIds: [],
    followedCauseIds: [],
    followedCommunityIds: [],
    eventIds: [],
    objectiveIds: [],
  };

  const params = new URLSearchParams();

  if (criteria) {
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const url = `${communitiesApiBase}/api/subscriptions/${userId}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.warn(
        `Unable to load user subscriptions from ${url} (${response.status}). Notifications will continue without community or cause subscriptions.`
      );
      return emptyResponse;
    }

    return (await response.json()) as UserSubscriptionsResponse;
  } catch (error) {
    console.warn(
      `Unable to load user subscriptions from ${url}. Notifications will continue without community or cause subscriptions.`,
      error
    );
    return emptyResponse;
  }
}

export function toRequestStatusNotification(event: RequestStatusChangedResult['requestStatusChanged']): Notification {
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
        ? `Enhorabuena, tu solicitud ${event.name} ha sido aprobada. Pincha aquí para acceder a mis solicitudes.`
        : `Lo sentimos, tu solicitud ${event.name} ha sido rechazada. Pincha aquí para ver el motivo.`,
    read: false,
    createdAt: new Date(),
    type: statusToTypeMap[event.status] || NotificationType.REQUEST_ACCEPTED,
    link: `${ROUTES.profile.requests}`,
  };
}

export function toCauseCreatedNotification(event: CauseCreatedResult['causeCreated'], userId: string): Notification {
  return {
    id: `cause-created-${event.id}`,
    userId,
    title: 'Nueva causa creada',
    message: `Se ha creado la causa ${event.name} en una comunidad que sigues. Pincha aquí para ver la causa`,
    read: false,
    createdAt: new Date(),
    type: NotificationType.CAUSE_CREATED,
    link: `${ROUTES.communities.causeDetail(event.communityId, event.id)}`,
  };
}

export function toActionCreatedNotification(event: ActionCreatedResult['actionCreated'], userId: string): Notification {
  return {
    id: `action-created-${event.id}`,
    userId,
    title: 'Nueva accion creada',
    message: `Se ha creado la accion ${event.name} en una causa que sigues. Pincha aquí para ver la acción`,
    read: false,
    createdAt: new Date(),
    type: NotificationType.ACTION_CREATED,
    link: `${ROUTES.communities.actionDetail(event.communityId, event.causeId, event.id)}`,
  };
}
