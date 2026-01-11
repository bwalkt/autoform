export const designTokens = {
  size: {
    xs: {
      height: "1.5rem",
      fontSize: "0.75rem",
      paddingX: "0.5rem",
      paddingY: "0.25rem",
      lineHeight: "1rem",
      iconSize: "0.75rem",
      gap: "0.25rem",
    },
    sm: {
      height: "2rem",
      fontSize: "0.875rem",
      paddingX: "0.75rem",
      paddingY: "0.375rem",
      lineHeight: "1.25rem",
      iconSize: "0.875rem",
      gap: "0.375rem",
    },
    md: {
      height: "2.5rem",
      fontSize: "0.875rem",
      paddingX: "1rem",
      paddingY: "0.5rem",
      lineHeight: "1.25rem",
      iconSize: "1rem",
      gap: "0.5rem",
    },
    lg: {
      height: "3rem",
      fontSize: "1rem",
      paddingX: "1.25rem",
      paddingY: "0.625rem",
      lineHeight: "1.5rem",
      iconSize: "1.125rem",
      gap: "0.5rem",
    },
  },

  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },

  // Button/interactive element variants
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

export type Size = "xs" | "sm" | "md" | "lg";
export type Variant = "solid" | "soft" | "outline" | "ghost";
export type Radius = "none" | "sm" | "md" | "lg" | "full";
export type Color = "default" | "primary" | "info" | "success" | "warning" | "error";

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
