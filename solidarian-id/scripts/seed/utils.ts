import { faker } from '@faker-js/faker';
import { COUNTRIES, SDG_VALUES } from './config';

/**
 * Utility functions for the seed script
 * Contains helpers for validation, data generation, and common operations
 */

// =============================================================================
// Environment Validation
// =============================================================================

/**
 * Validates that we're not running in production environment
 * Throws an error and exits if NODE_ENV is 'production'
 */
export function validateEnvironment(): void {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ ERROR: This script cannot run in production environment!');
    console.error('   Current NODE_ENV:', process.env.NODE_ENV);
    console.error('   Set NODE_ENV=development to run this script.');
    process.exit(1);
  }
  console.log(`✅ Environment check passed (NODE_ENV=${process.env.NODE_ENV || 'undefined'})`);
}

// =============================================================================
// Random Utilities
// =============================================================================

/**
 * Generates a random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
  return faker.number.int({ min, max });
}

/**
 * Delay function to avoid overwhelming the API
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================================
// String Utilities
// =============================================================================

/**
 * Generates a unique username from person's name
 * Must be 2-16 characters, only letters, numbers, dots, underscores
 * Cannot start/end with dot or have consecutive dots
 */
export function generateUsername(index: number): string {
  const firstName = faker.person
    .firstName()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, '');
  const lastName = faker.person
    .lastName()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, '');
  // Combine and limit to 16 chars (max username length)
  const base = `${firstName}${lastName}`.slice(0, 13);
  const suffix = String(index).slice(0, 3);
  return `${base}${suffix}`.slice(0, 16);
}

/**
 * Generates a secure password that meets validation requirements
 * Must be at least 12 characters and contain: uppercase, lowercase, number, and special character
 */
export function generateSecurePassword(): string {
  const upper = faker.string.alpha({ length: 3, casing: 'upper' });
  const lower = faker.string.alpha({ length: 5, casing: 'lower' });
  const number = faker.string.numeric({ length: 3 });
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '&', '*']);
  // Result: 3 + 5 + 3 + 1 = 12 characters minimum
  return `${upper}${lower}${number}${special}`;
}

/**
 * Generates a description with minimum 15 characters and maximum 200 characters
 */
export function generateDescription(context: string): string {
  const sentences = faker.lorem.sentences({ min: 1, max: 2 });
  const fullText = `${context}. ${sentences}`;
  // Ensure it's under 200 characters (validation requirement)
  return fullText.slice(0, 200);
}

/**
 * Generates a name for causes/actions/communities with a specific pattern
 */
export function generateRequestName(theme: string, actionTypes: string[]): string {
  const action = faker.helpers.arrayElement(actionTypes);
  const year = faker.helpers.arrayElement(['2026', '2027']);
  return `${action} ${theme} ${year}`.slice(0, 50);
}

// =============================================================================
// Phone Number Utilities
// =============================================================================

/**
 * Generates a random phone number for a given country
 */
export function generatePhoneNumber(phonePrefix: string): string {
  const number = faker.string.numeric({ length: 9 });
  return `${phonePrefix}${number}`;
}

// =============================================================================
// Date Utilities
// =============================================================================

/**
 * Generates a future date string in ISO format
 */
export function generateFutureDate(daysFromNow: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow + faker.number.int({ min: 1, max: 180 }));
  return date.toISOString();
}

// =============================================================================
// SDG Utilities
// =============================================================================

/**
 * Selects random SDGs (1-3 goals)
 */
export function selectRandomSDGs(): number[] {
  const count = faker.number.int({ min: 1, max: 3 });
  return faker.helpers.arrayElements(SDG_VALUES, count);
}

// =============================================================================
// Location Utilities
// =============================================================================

/**
 * Selects a random country from the predefined list
 */
export function selectRandomCountry() {
  return faker.helpers.arrayElement(COUNTRIES);
}

/**
 * Selects a random city from a country
 */
export function selectRandomCity(cities: string[]): string {
  return faker.helpers.arrayElement(cities);
}
