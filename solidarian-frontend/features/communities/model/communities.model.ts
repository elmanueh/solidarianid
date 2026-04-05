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

export interface User {
  id: string;
  fullName: string;
  email?: string | null;
  mobilePhone?: string | null;
}

export interface CommunityCause {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  ods: SustainableDevelopmentGoal[];
  initialDate: IsoDateString;
  communityId: string;
  userIds: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  creator: User;
  admins: User[];
  members: User[];
  causes: CommunityCause[];
}

export enum RequestType {
  CAUSE = "CAUSE",
  COMMUNITY = "COMMUNITY",
  ACTION = "ACTION",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Request {
  id: string;
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string | null;
  userId: string;
}

export interface RequestStatusChangedEvent {
  id: string;
  type: RequestType;
  name: string;
  description: string;
  status: RequestStatus;
  reason?: string | null;
  userId: string;
  createdEntityId?: string | null;
}

export interface CommunityCauseRequestInput {
  name: string;
  description: string;
  ods: SustainableDevelopmentGoal[];
  initialDate: IsoDateString;
  durationDays: number;
}

export interface CreateCommunityRequestInput {
  name: string;
  description: string;
  causeCreationRequests: CommunityCauseRequestInput[];
  userId: string;
}
