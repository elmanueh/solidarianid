import { CauseKey } from '@/components/preferences/preferences-category';
import { DurationKey } from '@/components/preferences/preferences-duration';
import { OdsId } from '@/features/causes/constants/ods.constants';
import { APP_URLS } from '@/features/config/urls';

export interface UserPreferencesProps {
  preferredSDGs: OdsId[];

  preferredCategories: CauseKey[];

  durationPreferences: DurationKey[];

  notificationsEnabled: boolean;
}

export async function setPreferences(preferences: UserPreferencesProps, userId: string) {
  const url = APP_URLS.api.users.preferences(userId);

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
  const url = APP_URLS.api.users.preferences(userId);
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }

  return await response.json();
}
