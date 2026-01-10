import type { Country } from './types';

/**
 * Configuration for the seed script
 * Centralizes all constants, limits, and environment-dependent values
 */

// =============================================================================
// Faker Configuration
// =============================================================================

/** Deterministic seed for reproducible fake data */
export const FAKER_SEED = 12345;

// =============================================================================
// Data Volume Configuration
// =============================================================================

/** Number of users to create (random between min and max) - Target: ~300 */
export const USERS_MIN = 280;
export const USERS_MAX = 320;

/** Number of community requests to create (random between min and max) - Target: ~50 */
export const COMMUNITY_REQUESTS_MIN = 45;
export const COMMUNITY_REQUESTS_MAX = 55;

/** Number of cause requests to create (random between min and max) - Target: ~200 */
export const CAUSE_REQUESTS_MIN = 185;
export const CAUSE_REQUESTS_MAX = 215;

/** Number of action requests to create (random between min and max) - Target: ~500 */
export const ACTION_REQUESTS_MIN = 480;
export const ACTION_REQUESTS_MAX = 520;

// =============================================================================
// Service URLs
// =============================================================================

export const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://localhost:3001/api';
export const COMMUNITIES_SERVICE_URL = process.env.COMMUNITIES_SERVICE_URL || 'http://localhost:3002/api';
export const ADMIN_SERVICE_URL = process.env.ADMIN_SERVICE_URL || 'http://localhost:3000';

// =============================================================================
// Admin Credentials
// =============================================================================

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'manuel.perez@solidarianid.org';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin2024!Pass';

// =============================================================================
// SDG (Sustainable Development Goals)
// =============================================================================

/** Valid SDG values (1-17) matching SustainableDevelopmentGoal enum */
export const SDG_VALUES = Array.from({ length: 17 }, (_, i) => i + 1);

// =============================================================================
// Country codes with phone prefixes
// =============================================================================

export const COUNTRIES: Country[] = [
  {
    code: 'ES',
    phonePrefix: '+34',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Murcia'],
  },
  {
    code: 'MX',
    phonePrefix: '+52',
    cities: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Cancún'],
  },
  {
    code: 'AR',
    phonePrefix: '+54',
    cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Tucumán'],
  },
  {
    code: 'CO',
    phonePrefix: '+57',
    cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'],
  },
  {
    code: 'GB',
    phonePrefix: '+44',
    cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh', 'Glasgow', 'Bristol'],
  },
  {
    code: 'FR',
    phonePrefix: '+33',
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Bordeaux', 'Lille'],
  },
  {
    code: 'DE',
    phonePrefix: '+49',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Dresden'],
  },
  {
    code: 'IT',
    phonePrefix: '+39',
    cities: ['Roma', 'Milano', 'Napoli', 'Torino', 'Firenze', 'Bologna', 'Venezia'],
  },
  {
    code: 'CL',
    phonePrefix: '+56',
    cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  },
  {
    code: 'PE',
    phonePrefix: '+51',
    cities: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Chiclayo'],
  },
  {
    code: 'BR',
    phonePrefix: '+55',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  },
  {
    code: 'VE',
    phonePrefix: '+58',
    cities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'],
  },
];

// =============================================================================
// Business Domain Data
// =============================================================================

/** Units for action objectives */
export const OBJECTIVE_UNITS = ['kilogramos', 'unidades', 'litros', 'personas', 'horas', 'euros', 'paquetes', 'cajas'];

/** Themes for causes, actions, and communities */
export const CAUSE_THEMES = [
  'alimentación',
  'educación',
  'salud',
  'medio ambiente',
  'agua potable',
  'vivienda',
  'emergencias',
  'derechos humanos',
  'igualdad de género',
  'desarrollo sostenible',
  'pobreza',
  'infancia',
  'tercera edad',
  'discapacidad',
  'refugiados',
];

/** Community types for naming */
export const COMMUNITY_TYPES = ['Comunidad', 'Asociación', 'Red', 'Grupo', 'Colectivo', 'Fundación'];

/** Event types for naming */
export const EVENT_TYPES = [
  'Jornada solidaria',
  'Encuentro comunitario',
  'Evento benéfico',
  'Actividad de voluntariado',
  'Reunión de coordinación',
  'Taller formativo',
];

/** Action types for naming */
export const ACTION_TYPES = [
  'Campaña',
  'Proyecto',
  'Iniciativa',
  'Programa',
  'Acción solidaria',
  'Movimiento',
  'Red de apoyo',
  'Operación',
  'Jornada',
];

// =============================================================================
// Request Processing Configuration
// =============================================================================

/**
 * Probability thresholds for request processing
 * - 0 to APPROVAL_THRESHOLD (0.6): Approve - 60%
 * - APPROVAL_THRESHOLD to REJECTION_THRESHOLD (0.6-0.9): Reject - 30%
 * - REJECTION_THRESHOLD to 1.0 (0.9-1.0): Leave pending - 10%
 */
export const APPROVAL_THRESHOLD = 0.6; // 60% approve
export const REJECTION_THRESHOLD = 0.9; // 30% reject (0.6-0.9), 10% pending (0.9-1.0)

// =============================================================================
// Delay Configuration
// =============================================================================

export const DELAY_BETWEEN_REQUESTS_MS = 50;
export const DELAY_FOR_USER_BATCH_MS = 100;
export const USER_BATCH_SIZE = 20;
export const KAFKA_PROPAGATION_DELAY_MS = 2000;
