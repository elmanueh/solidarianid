// ==================== USERNAME VALIDATION ====================
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 16;
export const USERNAME_REGEX = /^(?!\.)(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._]{2,16}$/;

// ==================== FULLNAME VALIDATION ====================

export const FULLNAME_MIN_LENGTH = 3;
export const FULLNAME_MAX_LENGTH = 50;
export const FULLNAME_REGEX = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑàèìòùÀÈÌÒÙçÇ\s]+$/;

// ==================== USER LOCATION VALIDATION ====================
export const CITY_MIN_LENGTH = 1;
export const CITY_MAX_LENGTH = 25;
export const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/; // ISO 3166-1 alpha-2
export const COUNTRY_CODE_LENGTH = 2;

// ==================== PASSWORD VALIDATION ====================
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
