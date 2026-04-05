import {
  RequestStatus,
  RequestType,
  SustainableDevelopmentGoal,
} from "@/features/communities/model";

export const COMMUNITIES_MODEL_KEY = "communities";
export const REQUESTS_MODEL_KEY = "requests";

export const REQUEST_TYPE_VALUES = Object.freeze([
  RequestType.CAUSE,
  RequestType.COMMUNITY,
  RequestType.ACTION,
]);

export const REQUEST_STATUS_VALUES = Object.freeze([
  RequestStatus.PENDING,
  RequestStatus.APPROVED,
  RequestStatus.REJECTED,
]);

export const SUSTAINABLE_DEVELOPMENT_GOAL_VALUES = Object.freeze([
  SustainableDevelopmentGoal.NoPoverty,
  SustainableDevelopmentGoal.ZeroHunger,
  SustainableDevelopmentGoal.GoodHealthAndWellBeing,
  SustainableDevelopmentGoal.QualityEducation,
  SustainableDevelopmentGoal.GenderEquality,
  SustainableDevelopmentGoal.CleanWaterAndSanitation,
  SustainableDevelopmentGoal.AffordableAndCleanEnergy,
  SustainableDevelopmentGoal.DecentWorkAndEconomicGrowth,
  SustainableDevelopmentGoal.IndustryInnovationAndInfrastructure,
  SustainableDevelopmentGoal.ReducedInequalities,
  SustainableDevelopmentGoal.SustainableCitiesAndCommunities,
  SustainableDevelopmentGoal.ResponsibleConsumptionAndProduction,
  SustainableDevelopmentGoal.ClimateAction,
  SustainableDevelopmentGoal.LifeBelowWater,
  SustainableDevelopmentGoal.LifeOnLand,
  SustainableDevelopmentGoal.PeaceJusticeAndStrongInstitutions,
  SustainableDevelopmentGoal.PartnershipsForTheGoals,
]);
