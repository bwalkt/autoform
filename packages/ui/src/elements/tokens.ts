export const designTokens = {
  // Element sizes for form components (Radix-style 1-4)
  size: {
    "1": {
      height: "1.5rem",
      fontSize: "0.75rem",
      paddingX: "0.5rem",
      paddingY: "0.25rem",
      lineHeight: "1rem",
      iconSize: "0.75rem",
      gap: "0.25rem",
    },
    "2": {
      height: "2rem",
      fontSize: "0.875rem",
      paddingX: "0.75rem",
      paddingY: "0.375rem",
      lineHeight: "1.25rem",
      iconSize: "1rem",
      gap: "0.375rem",
    },
    "3": {
      height: "2.5rem",
      fontSize: "1rem",
      paddingX: "1rem",
      paddingY: "0.5rem",
      lineHeight: "1.5rem",
      iconSize: "1.25rem",
      gap: "0.5rem",
    },
    "4": {
      height: "3rem",
      fontSize: "1.125rem",
      paddingX: "1.25rem",
      paddingY: "0.625rem",
      lineHeight: "1.75rem",
      iconSize: "1.5rem",
      gap: "0.625rem",
    },
  },

  // Typography scale (9-step scale based on Radix UI)
  typography: {
    "1": {
      fontSize: "0.75rem",    // 12px
      lineHeight: "1rem",     // 16px
      letterSpacing: "0.0025em",
    },
    "2": {
      fontSize: "0.875rem",   // 14px
      lineHeight: "1.25rem",  // 20px
      letterSpacing: "0em",
    },
    "3": {
      fontSize: "1rem",       // 16px
      lineHeight: "1.5rem",   // 24px
      letterSpacing: "0em",
    },
    "4": {
      fontSize: "1.125rem",   // 18px
      lineHeight: "1.625rem", // 26px
      letterSpacing: "-0.0025em",
    },
    "5": {
      fontSize: "1.25rem",    // 20px
      lineHeight: "1.75rem",  // 28px
      letterSpacing: "-0.005em",
    },
    "6": {
      fontSize: "1.5rem",     // 24px
      lineHeight: "1.875rem", // 30px
      letterSpacing: "-0.00625em",
    },
    "7": {
      fontSize: "1.75rem",    // 28px
      lineHeight: "2.25rem",  // 36px
      letterSpacing: "-0.0075em",
    },
    "8": {
      fontSize: "2.1875rem",  // 35px
      lineHeight: "2.5rem",   // 40px
      letterSpacing: "-0.01em",
    },
    "9": {
      fontSize: "3.75rem",    // 60px
      lineHeight: "3.75rem",  // 60px
      letterSpacing: "-0.025em",
    },
  },

  // Font weights
  weight: {
    light: "300",
    regular: "400",
    medium: "500",
    bold: "700",
  },

  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },

  variant: {
    solid: {
      background: "var(--color-accent-9)",
      color: "var(--color-accent-contrast)",
      hoverBackground: "var(--color-accent-10)",
      activeBackground: "var(--color-accent-10)",
    },
    soft: {
      background: "var(--color-accent-a3)",
      color: "var(--color-accent-11)",
      hoverBackground: "var(--color-accent-a4)",
      activeBackground: "var(--color-accent-a5)",
    },
    outline: {
      border: "1px solid",
      borderColor: "var(--color-accent-a8)",
      background: "transparent",
      color: "var(--color-accent-11)",
      hoverBackground: "var(--color-accent-a2)",
      activeBackground: "var(--color-accent-a3)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-accent-11)",
      hoverBackground: "var(--color-accent-a3)",
      activeBackground: "var(--color-accent-a4)",
    },
  },

  color: {
    default: {
      border: "var(--color-default-border)",
      borderSubtle: "var(--color-default-border-subtle)",
      surface: "var(--color-default-surface)",
      softBackground: "var(--color-default-soft)",
      softBackgroundHover: "var(--color-default-soft-hover)",
      primary: "var(--color-default-primary)",
      primaryAlpha: "var(--color-default-primary-alpha)",
      text: "var(--color-default-text)",
      background: "var(--color-default-background)",
    },
    primary: {
      border: "var(--color-primary-border)",
      borderSubtle: "var(--color-primary-border-subtle)",
      surface: "var(--color-primary-surface)",
      softBackground: "var(--color-primary-soft)",
      softBackgroundHover: "var(--color-primary-soft-hover)",
      primary: "var(--color-primary-primary)",
      primaryAlpha: "var(--color-primary-primary-alpha)",
      text: "var(--color-primary-text)",
      background: "var(--color-primary-background)",
    },
    neutral: {
      border: "var(--color-neutral-border)",
      borderSubtle: "var(--color-neutral-border-subtle)",
      surface: "var(--color-neutral-surface)",
      softBackground: "var(--color-neutral-soft)",
      softBackgroundHover: "var(--color-neutral-soft-hover)",
      primary: "var(--color-neutral-primary)",
      primaryAlpha: "var(--color-neutral-primary-alpha)",
      text: "var(--color-neutral-text)",
      background: "var(--color-neutral-background)",
    },
    info: {
      border: "var(--color-info-border)",
      borderSubtle: "var(--color-info-border-subtle)",
      surface: "var(--color-info-surface)",
      softBackground: "var(--color-info-soft)",
      softBackgroundHover: "var(--color-info-soft-hover)",
      primary: "var(--color-info-primary)",
      primaryAlpha: "var(--color-info-primary-alpha)",
      text: "var(--color-info-text)",
      background: "var(--color-info-background)",
    },
    success: {
      border: "var(--color-success-border)",
      borderSubtle: "var(--color-success-border-subtle)",
      surface: "var(--color-success-surface)",
      softBackground: "var(--color-success-soft)",
      softBackgroundHover: "var(--color-success-soft-hover)",
      primary: "var(--color-success-primary)",
      primaryAlpha: "var(--color-success-primary-alpha)",
      text: "var(--color-success-text)",
      background: "var(--color-success-background)",
    },
    warning: {
      border: "var(--color-warning-border)",
      borderSubtle: "var(--color-warning-border-subtle)",
      surface: "var(--color-warning-surface)",
      softBackground: "var(--color-warning-soft)",
      softBackgroundHover: "var(--color-warning-soft-hover)",
      primary: "var(--color-warning-primary)",
      primaryAlpha: "var(--color-warning-primary-alpha)",
      text: "var(--color-warning-text)",
      background: "var(--color-warning-background)",
    },
    error: {
      border: "var(--color-error-border)",
      borderSubtle: "var(--color-error-border-subtle)",
      surface: "var(--color-error-surface)",
      softBackground: "var(--color-error-soft)",
      softBackgroundHover: "var(--color-error-soft-hover)",
      primary: "var(--color-error-primary)",
      primaryAlpha: "var(--color-error-primary-alpha)",
      text: "var(--color-error-text)",
      background: "var(--color-error-background)",
    },
  },
} as const;

// Element size (Radix-style 1-4)
export type Size = "1" | "2" | "3" | "4";

// Typography size (Radix-style 1-9)
export type TypographySize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

// Font weight
export type Weight = "light" | "regular" | "medium" | "bold";

// Variants
export type Variant = "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";

export type Radius = "none" | "sm" | "md" | "lg" | "full";

export type Color = "default" | "primary" | "neutral" | "info" | "success" | "warning" | "error";

export type ResponsiveSize = Responsive<Size>;

// Layout tokens for Box and layout components
export const layoutTokens = {
  display: ["none", "inline", "inline-block", "block", "flex", "inline-flex", "grid", "inline-grid", "contents"] as const,

  position: ["static", "relative", "absolute", "fixed", "sticky"] as const,

  overflow: ["visible", "hidden", "clip", "scroll", "auto"] as const,

  flexDirection: ["row", "row-reverse", "column", "column-reverse"] as const,

  flexWrap: ["nowrap", "wrap", "wrap-reverse"] as const,

  alignItems: ["start", "center", "end", "baseline", "stretch"] as const,

  alignContent: ["start", "center", "end", "between", "around", "evenly", "stretch"] as const,

  justifyContent: ["start", "center", "end", "between", "around", "evenly"] as const,

  alignSelf: ["auto", "start", "center", "end", "baseline", "stretch"] as const,

  justifySelf: ["auto", "start", "center", "end", "stretch"] as const,

  // Spacing scale (0-9)
  spacing: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const,
} as const;

export type Display = (typeof layoutTokens.display)[number];
export type Position = (typeof layoutTokens.position)[number];
export type Overflow = (typeof layoutTokens.overflow)[number];
export type FlexDirection = (typeof layoutTokens.flexDirection)[number];
export type FlexWrap = (typeof layoutTokens.flexWrap)[number];
export type AlignItems = (typeof layoutTokens.alignItems)[number];
export type AlignContent = (typeof layoutTokens.alignContent)[number];
export type JustifyContent = (typeof layoutTokens.justifyContent)[number];
export type AlignSelf = (typeof layoutTokens.alignSelf)[number];
export type JustifySelf = (typeof layoutTokens.justifySelf)[number];
export type Spacing = (typeof layoutTokens.spacing)[number];

// Responsive prop type helper
export type Responsive<T> = T | {
  initial?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
