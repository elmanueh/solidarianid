import { CauseKey } from '@/components/preferences/preferences-category';
import { DurationKey } from '@/components/preferences/preferences-duration';
import { OdsId } from '@/features/causes/constants/ods.constants';

export interface UserPreferencesProps {
  preferredSDGs: OdsId[];

  preferredCategories: CauseKey[];

  durationPreferences: DurationKey[];

  notificationsEnabled: boolean;
}

export async function setPreferences(preferences: UserPreferencesProps, userId: string) {
  const url = process.env.NEXT_PUBLIC_GATEWAY_URL
    ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/api/users/${userId}/preferences`
    : `http://localhost:8090/api/users/${userId}/preferences`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'No se pudieron guardar las preferencias.');
  }
}

export async function getPreferences(userId: string): Promise<UserPreferencesProps> {
  const url = process.env.NEXT_PUBLIC_GATEWAY_URL
    ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/api/users/${userId}/preferences`
    : `http://localhost:8090/api/users/${userId}/preferences`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }

  return await response.json();
}
