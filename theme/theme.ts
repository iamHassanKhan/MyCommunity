// theme.ts

const COLORS = {
  // Brand
  primary: "#FFD600", // bright yellow (buttons, highlights)
  primaryDark: "#FFC107",
  primaryLight: "#FFECB3",

  secondary: "#1976D2", // deep blue (icons, tabs)
  secondaryLight: "#64B5F6",
  secondaryDark: "#0D47A1",

  success: "#4CAF50",
  danger: "#F44336",
  warning: "#FFA000",
  info: "#0288D1",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray: "#9E9E9E",
  grayLight: "#F0F0F0",
  grayMedium: "#C4C4C4",
  grayDark: "#616161",

  // Backgrounds
  backgroundLight: "#F9FAFB",
  backgroundDark: "#121212",

  // Cards
  cardLight: "#FFFFFF",
  cardDark: "#1E1E1E",

  // Utility
  border: "#E0E0E0",
  shadow: "rgba(0,0,0,0.15)",
  overlay: "rgba(0,0,0,0.5)",
};

const SPACING = {
  none: 0,
  xxs:2,
  xs: 4,
  sm: 8,
  default:10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

const FONTS = {
  regular: "System",
  medium: "System",
  bold: "System",
  semiBold: "System",
};

const FONT_SIZES = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 40,
};

const RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 30,
  round: 50, // perfect for avatars & buttons
};

const SHADOWS = {
  light: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  heavy: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

const THEME = {
  light: {
    background: COLORS.backgroundLight,
    text: COLORS.black,
    textSecondary: COLORS.grayDark,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    card: COLORS.cardLight,
    border: COLORS.border,
  },
  dark: {
    background: COLORS.backgroundDark,
    text: COLORS.white,
    textSecondary: COLORS.gray,
    primary: COLORS.primaryLight,
    secondary: COLORS.secondaryLight,
    card: COLORS.cardDark,
    border: COLORS.grayDark,
  },
};

export { COLORS, FONT_SIZES, FONTS, SPACING, RADIUS, SHADOWS, THEME };
