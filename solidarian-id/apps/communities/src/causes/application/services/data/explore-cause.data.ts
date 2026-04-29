import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface ExploreCauseData {
  id: string;
  communityId: string;
  name: string;
  description: string;
  ods: SustainableDevelopmentGoal[];
}
