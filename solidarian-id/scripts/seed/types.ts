/**
 * Type definitions for the seed script
 * Contains all DTOs and interfaces used for data generation and API calls
 */

// =============================================================================
// User Types
// =============================================================================

export interface RegisterUserDto {
  fullName: string;
  username: string;
  mobilePhone: string;
  password: string;
  city: string;
  countryCode: string;
}

export interface CreatedUser {
  id: string;
  username: string;
}

export interface UpdateUserPreferencesDto {
  preferredSDGs?: number[];
  preferredCategories?: string[];
  durationPreferences?: string[];
  notificationsEnabled?: boolean;
}

// =============================================================================
// Community Types
// =============================================================================

export interface CommunityRequestDto {
  name: string;
  description: string;
  userId: string;
  causeCreationRequests: CauseCreationRequest[];
}

export interface CreatedCommunity {
  id: string;
  name: string;
  creatorId: string;
  description: string;
}

// =============================================================================
// Cause Types
// =============================================================================

export interface CauseCreationRequest {
  name: string;
  description: string;
  ods: number[];
  initialDate: string;
  durationDays: number;
}

export interface CauseRequestDto {
  name: string;
  description: string;
  userId: string;
  communityId: string;
  ods: number[];
  initialDate: string;
  durationDays: number;
}

export interface CreatedCause {
  id: string;
  name: string;
  communityId: string;
  creatorId: string;
}

// =============================================================================
// Action Types
// =============================================================================

export interface ObjectiveDto {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface PlaceDto {
  direction: string;
  city: string;
  countryCode: string;
}

export interface EventDto {
  name: string;
  description: string;
  initialDate: string;
  place: PlaceDto;
}

export interface ActionRequestDto {
  name: string;
  description: string;
  userId: string;
  causeId: string;
  objectives: ObjectiveDto[];
  events: EventDto[];
}

// =============================================================================
// Country & Location Types
// =============================================================================

export interface Country {
  code: string;
  phonePrefix: string;
  cities: string[];
}

// =============================================================================
// Statistics Types
// =============================================================================

export interface SeedStats {
  users: number;
  communityRequests: number;
  causeRequests: number;
  actionRequests: number;
  totalRequests: number;
  approvedCommunities: number;
  rejectedCommunities: number;
  pendingCommunities: number;
  approvedCauses: number;
  rejectedCauses: number;
  pendingCauses: number;
  approvedActions: number;
  rejectedActions: number;
  pendingActions: number;
}

export interface ProcessingResults {
  approved: number;
  rejected: number;
  pending: number;
}
