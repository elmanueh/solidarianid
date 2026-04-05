import type { Action } from "@/features/actions/model";

export type IsoDateString = string;

export enum SustainableDevelopmentGoal {
  NoPoverty = "NoPoverty",
  ZeroHunger = "ZeroHunger",
  GoodHealthAndWellBeing = "GoodHealthAndWellBeing",
  QualityEducation = "QualityEducation",
  GenderEquality = "GenderEquality",
  CleanWaterAndSanitation = "CleanWaterAndSanitation",
  AffordableAndCleanEnergy = "AffordableAndCleanEnergy",
  DecentWorkAndEconomicGrowth = "DecentWorkAndEconomicGrowth",
  IndustryInnovationAndInfrastructure = "IndustryInnovationAndInfrastructure",
  ReducedInequalities = "ReducedInequalities",
  SustainableCitiesAndCommunities = "SustainableCitiesAndCommunities",
  ResponsibleConsumptionAndProduction = "ResponsibleConsumptionAndProduction",
  ClimateAction = "ClimateAction",
  LifeBelowWater = "LifeBelowWater",
  LifeOnLand = "LifeOnLand",
  PeaceJusticeAndStrongInstitutions = "PeaceJusticeAndStrongInstitutions",
  PartnershipsForTheGoals = "PartnershipsForTheGoals",
}

export interface Cause {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  ods: SustainableDevelopmentGoal[];
  initialDate: IsoDateString;
  actions: Action[];
  communityId: string;
  userIds: string[];
}

export interface CreateCauseRequestInput {
  name: string;
  description: string;
  ods: SustainableDevelopmentGoal[];
  initialDate: IsoDateString;
  durationDays: number;
  userId: string;
  communityId: string;
}
