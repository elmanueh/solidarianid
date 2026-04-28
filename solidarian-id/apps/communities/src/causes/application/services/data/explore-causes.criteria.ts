import { ExploreCommunitiesCriteria } from '@app/communities/communities/application/services/data/explore-communities.criteria';
import { SustainableDevelopmentGoal } from '@app/value-objects/model/ods';

export interface ExploreCausesCriteria extends ExploreCommunitiesCriteria {
  ods?: SustainableDevelopmentGoal[];
}
