/**
 * Paleta de colores de SolidarianID
 *
 * Esta paleta se usa tanto en Tailwind CSS como en la generación de PDFs
 * para mantener consistencia visual en toda la aplicación.
 */

export const colors = {
  // Ocean Blue - Color principal
  oceanBlue: {
    50: '#ebf5fa',
    100: '#d6eaf5',
    200: '#add5eb',
    300: '#85c0e0',
    400: '#5cabd6',
    500: '#3396cc',
    600: '#2978a3',
    700: '#1f5a7a',
    800: '#143c52',
    900: '#0a1e29',
    950: '#07151d',
  },

  // Harvest Orange - Color secundario
  harvestOrange: {
    50: '#fcf1e8',
    100: '#fae3d1',
    200: '#f4c8a4',
    300: '#efac76',
    400: '#ea9148',
    500: '#e4751b',
    600: '#b75e15',
    700: '#894610',
    800: '#5b2f0b',
    900: '#2e1705',
    950: '#201004',
  },

  // Sage Green - Color de acento
  sageGreen: {
    50: '#f3f8ec',
    100: '#e7f1da',
    200: '#d0e3b5',
    300: '#b8d68f',
    400: '#a1c86a',
    500: '#89ba45',
    600: '#6e9537',
    700: '#527029',
    800: '#374a1c',
    900: '#1b250e',
    950: '#131a0a',
  },

  // Soft Fawn - Color complementario
  softFawn: {
    50: '#f8f5ec',
    100: '#f1ebda',
    200: '#e3d6b5',
    300: '#d6c28f',
    400: '#c8ad6a',
    500: '#ba9945',
    600: '#957a37',
    700: '#705c29',
    800: '#4a3d1c',
    900: '#251f0e',
    950: '#1a150a',
  },

  // Dark Wine - Color de error/alerta
  darkWine: {
    50: '#f9ebeb',
    100: '#f3d8d8',
    200: '#e7b1b1',
    300: '#db8a8a',
    400: '#cf6363',
    500: '#c33c3c',
    600: '#9c3030',
    700: '#752424',
    800: '#4e1818',
    900: '#270c0c',
    950: '#1b0808',
  },

  // Black Haze - Neutro principal
  blackHaze: {
    50: '#f7f8fa',
    100: '#eceef2',
    200: '#d4dae3',
    300: '#aebacb',
    400: '#8295ae',
    500: '#627795',
    600: '#4e607b',
    700: '#404d64',
    800: '#374255',
    900: '#323a48',
    950: '#212630',
    999: '#121418',
  },

  // Athens Gray - Neutro secundario
  athensGray: {
    50: '#f6f8f9',
    100: '#eef1f4',
    200: '#d4dce3',
    300: '#aebfcb',
    400: '#829cae',
    500: '#628095',
    600: '#4e677b',
    700: '#405364',
    800: '#384754',
    900: '#323e48',
    950: '#212830',
  },

  // Iron - Neutro para bordes
  iron: {
    50: '#f5f7f9',
    100: '#e9ecf0',
    200: '#d9dee5',
    300: '#bec6d2',
    400: '#9eaabc',
    500: '#8693ab',
    600: '#75809b',
    700: '#68718d',
    800: '#585e75',
    900: '#4a4e5e',
    950: '#30323b',
  },

  // Pale Sky - Neutro para texto
  paleSky: {
    50: '#f7f8f8',
    100: '#edeef1',
    200: '#d8dbdf',
    300: '#b6bac3',
    400: '#8e95a2',
    500: '#6b7280',
    600: '#5b616e',
    700: '#4a4e5a',
    800: '#40444c',
    900: '#383a42',
    950: '#25272c',
  },
} as const;

/**
 * Alias de colores para casos de uso específicos
 */
export const semanticColors = {
  // Colores principales
  primary: colors.oceanBlue[600],
  primaryLight: colors.oceanBlue[100],
  primaryDark: colors.oceanBlue[800],

  // Colores secundarios
  secondary: colors.harvestOrange[500],
  secondaryLight: colors.harvestOrange[100],
  secondaryDark: colors.harvestOrange[800],

  // Estados
  success: colors.sageGreen[600],
  successLight: colors.sageGreen[100],
  warning: colors.softFawn[500],
  warningLight: colors.softFawn[100],
  error: colors.darkWine[600],
  errorLight: colors.darkWine[100],

  // Neutros
  textPrimary: colors.blackHaze[950],
  textSecondary: colors.paleSky[500],
  textTertiary: colors.paleSky[400],
  border: colors.iron[200],
  borderDark: colors.iron[700],
  background: colors.blackHaze[50],
  backgroundDark: colors.blackHaze[900],
} as const;

/**
 * Helper para acceder a colores de forma type-safe
 */
export type ColorShade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950
  | 999;
export type ColorName = keyof typeof colors;
