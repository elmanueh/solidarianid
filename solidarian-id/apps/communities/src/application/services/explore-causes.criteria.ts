import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';
import { ExploreCommunitiesCriteria } from './explore-communities.criteria';

export interface ExploreCausesCriteria extends ExploreCommunitiesCriteria {
  ods?: SustainableDevelopmentGoal[];
}
