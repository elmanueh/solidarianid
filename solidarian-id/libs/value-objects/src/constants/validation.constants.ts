/**
 * Validation constants for Value Objects
 * Centralizes all validation rules, regex patterns, and constraints
 */

// ==================== USERNAME VALIDATION ====================
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 16;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

// ==================== MOBILE PHONE VALIDATION ====================
export const MOBILE_PHONE_REGEX = /^\+[1-9]\d{1,14}$/;
export const MOBILE_PHONE_MAX_LENGTH = 16;

// ==================== USER LOCATION VALIDATION ====================
export const CITY_MIN_LENGTH = 1;
export const CITY_MAX_LENGTH = 25;
export const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/; // ISO 3166-1 alpha-2
export const COUNTRY_CODE_LENGTH = 2;

// ==================== PASSWORD VALIDATION ====================
export const HASHED_PASSWORD_LONGITUDE = /^.{20,255}$/;
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

// ==================== EMAIL VALIDATION ====================
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==================== NAME VALIDATION ====================
export const NAME_MIN_LENGTH = 5;
export const NAME_MAX_LENGTH = 20;

// ==================== DESCRIPTION VALIDATION ====================
export const DESCRIPTION_MIN_LENGTH = 15;
export const DESCRIPTION_MAX_LENGTH = 200;
