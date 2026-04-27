import { faker } from '@faker-js/faker';
import { CauseCategory, DurationPreference } from '@app/value-objects/model/user-preferences';
import {
  ACTION_TYPES,
  CAUSE_THEMES,
  COMMUNITY_TYPES,
  EVENT_TYPES,
  OBJECTIVE_UNITS,
  SDG_VALUES,
  SEED_USER_PASSWORD,
} from './config';
import type {
  ActionRequestDto,
  CauseCreationRequest,
  CauseRequestDto,
  CommunityRequestDto,
  EventDto,
  ObjectiveDto,
  RegisterUserDto,
  UpdateUserPreferencesDto,
} from './types';
import {
  generateDescription,
  generateFutureDate,
  generatePhoneNumber,
  generateRequestName,
  generateUsername,
  randomBetween,
  selectRandomCity,
  selectRandomCountry,
  selectRandomSDGs,
} from './utils';

/**
 * Data Generators
 * Functions to generate realistic fake data for seeding
 * Following DDD principles, these are pure functions with no side effects
 */

// =============================================================================
// User Generators
// =============================================================================

/**
 * Generates a user registration DTO with realistic fake data
 */
export function generateUserDto(index: number): RegisterUserDto {
  const country = selectRandomCountry();
  const city = selectRandomCity(country.cities);

  return {
    fullName: `${faker.person.firstName()} ${faker.person.lastName()} ${faker.person.lastName()}`.trim(),
    username: generateUsername(index),
    mobilePhone: generatePhoneNumber(country.phonePrefix),
    password: SEED_USER_PASSWORD,
    city,
    countryCode: country.code,
  };
}

/**
 * Generates a randomized user preferences patch payload.
 * Mirrors the distribution used by generate-user-preferences.js, but formatted
 * for the /users/:id/preferences PATCH endpoint.
 */
export function generateUserPreferencesPatchDto(): UpdateUserPreferencesDto {
  const profileType = faker.number.float({ min: 0, max: 100, fractionDigits: 4 });
  const payload: UpdateUserPreferencesDto = {};

  if (profileType < 10) {
    payload.durationPreferences = [DurationPreference.ANY];
    payload.notificationsEnabled = true;
    return payload;
  }

  const sdgCount = profileType < 40 ? randomBetween(0, 2) : randomBetween(1, 7);
  if (sdgCount > 0) {
    payload.preferredSDGs = faker.helpers.arrayElements(SDG_VALUES, sdgCount).sort((a: number, b: number) => a - b);
  }

  const categoryCount = profileType < 40 ? randomBetween(0, 2) : randomBetween(1, 5);
  if (categoryCount > 0) {
    payload.preferredCategories = faker.helpers.arrayElements(Object.values(CauseCategory), categoryCount);
  }

  const durationCount = profileType < 40 ? 1 : randomBetween(1, 2);
  payload.durationPreferences = faker.helpers.arrayElements(Object.values(DurationPreference), durationCount);
  payload.notificationsEnabled = faker.number.float({ min: 0, max: 1, fractionDigits: 4 }) < 0.8;

  return payload;
}

// =============================================================================
// Community Generators
// =============================================================================

/**
 * Generates a community request DTO
 */
export function generateCommunityRequestDto(): CommunityRequestDto {
  const theme = faker.helpers.arrayElement(CAUSE_THEMES);
  const causesCount = faker.number.int({ min: 1, max: 3 });
  const causeCreationRequests: CauseCreationRequest[] = Array.from({ length: causesCount }, () =>
    generateCauseCreationRequest(),
  );

  const communityType = faker.helpers.arrayElement(COMMUNITY_TYPES);

  return {
    name: `${communityType} ${faker.company.name()} por ${theme}`.slice(0, 50),
    description: generateDescription(`Comunidad dedicada a proyectos de ${theme} y desarrollo sostenible`),
    causeCreationRequests,
  };
}

// =============================================================================
// Cause Generators
// =============================================================================

/**
 * Generates a cause creation request DTO (for community requests)
 */
export function generateCauseCreationRequest(): CauseCreationRequest {
  const theme = faker.helpers.arrayElement(CAUSE_THEMES);
  return {
    name: generateRequestName(theme, ACTION_TYPES),
    description: generateDescription(`Causa benéfica enfocada en ${theme}`),
    ods: selectRandomSDGs(),
    initialDate: generateFutureDate(),
    durationDays: faker.number.int({ min: 30, max: 365 }),
  };
}

/**
 * Generates a standalone cause request DTO
 */
export function generateCauseRequestDto(communityId: string): CauseRequestDto {
  const theme = faker.helpers.arrayElement(CAUSE_THEMES);
  return {
    name: generateRequestName(theme, ACTION_TYPES),
    description: generateDescription(`Causa benéfica para apoyar iniciativas de ${theme}`),
    communityId,
    ods: selectRandomSDGs(),
    initialDate: generateFutureDate(),
    durationDays: faker.number.int({ min: 1, max: 365 }),
  };
}

// =============================================================================
// Action Generators
// =============================================================================

/**
 * Generates an objective DTO for actions
 */
export function generateObjectiveDto(): ObjectiveDto {
  const objectives = [
    { name: 'Recolección de alimentos', description: 'Recolectar alimentos no perecederos para familias necesitadas' },
    { name: 'Captación de voluntarios', description: 'Reclutar y formar nuevos voluntarios para el proyecto' },
    { name: 'Recaudación de fondos', description: 'Obtener recursos económicos para financiar las actividades' },
    { name: 'Distribución de materiales', description: 'Entregar materiales educativos o de primera necesidad' },
    { name: 'Capacitación', description: 'Formar a beneficiarios en habilidades específicas' },
    { name: 'Limpieza ambiental', description: 'Limpiar y recuperar espacios naturales degradados' },
    { name: 'Atención sanitaria', description: 'Proporcionar servicios básicos de salud' },
    { name: 'Construcción', description: 'Construir o reparar infraestructuras básicas' },
  ];

  const objective = faker.helpers.arrayElement(objectives);
  return {
    name: objective.name,
    description: objective.description,
    quantity: faker.number.int({ min: 10, max: 1000 }),
    unit: faker.helpers.arrayElement(OBJECTIVE_UNITS),
  };
}

/**
 * Generates an event DTO for actions
 */
export function generateEventDto(): EventDto {
  const country = selectRandomCountry();
  const city = selectRandomCity(country.cities);
  const theme = faker.helpers.arrayElement(CAUSE_THEMES);

  return {
    name: `${faker.helpers.arrayElement(EVENT_TYPES)} - ${theme}`.slice(0, 50),
    description: generateDescription(`Evento presencial para ${theme}`),
    initialDate: generateFutureDate(7),
    place: {
      direction: `${faker.location.streetAddress()}, ${faker.location.buildingNumber()}`,
      city,
      countryCode: country.code,
    },
  };
}

/**
 * Generates an action request DTO
 */
export function generateActionRequestDto(causeId: string): ActionRequestDto {
  const theme = faker.helpers.arrayElement(CAUSE_THEMES);
  const objectivesCount = faker.number.int({ min: 1, max: 3 });
  const eventsCount = faker.number.int({ min: 1, max: 2 });

  return {
    name: generateRequestName(theme, ACTION_TYPES),
    description: generateDescription(`Acción concreta para ${theme} con objetivos cuantificables`),
    causeId,
    objectives: Array.from({ length: objectivesCount }, () => generateObjectiveDto()),
    events: Array.from({ length: eventsCount }, () => generateEventDto()),
  };
}
