import { CauseKey } from '@/components/preferences/preferences-category';
import { DurationKey } from '@/components/preferences/preferences-duration';
import { OdsId } from '@/features/causes/constants/ods.constants';

export interface User {
  id: string;
  username: string;
  fullName: string;
  mobilePhone: string;
  city: string;
  countryCode: string;
  preferences: {
    preferredSDGs: OdsId[];
    preferredCategories: CauseKey[];
    durationPreferences: DurationKey[];
    notificationsEnabled: boolean;
  };
}
