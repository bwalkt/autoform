export const designTokens = {
  size: {
    '1': {
      height: '1.5rem',
      fontSize: '0.75rem',
      paddingX: '0.5rem',
      paddingY: '0.25rem',
      lineHeight: '1rem',
    },
    '2': {
      height: '2rem',
      fontSize: '0.875rem',
      paddingX: '0.75rem',
      paddingY: '0.375rem',
      lineHeight: '1.25rem',
    },
    '3': {
      height: '2.5rem',
      fontSize: '1rem',
      paddingX: '1rem',
      paddingY: '0.5rem',
      lineHeight: '1.5rem',
    },
  },
  
  radius: {
    none: '0',
    small: '0.25rem',
    medium: '0.375rem',
    large: '0.5rem',
    full: '9999px',
  },
  
  variant: {
    classic: {
      border: '1px solid',
      borderColor: 'var(--color-border)',
      background: 'var(--color-background)',
      color: 'var(--color-text)',
      focusBorderColor: 'var(--color-primary)',
      focusRingColor: 'var(--color-primary-alpha)',
    },
    surface: {
      border: '1px solid',
      borderColor: 'var(--color-border-subtle)',
      background: 'var(--color-surface)',
      color: 'var(--color-text)',
      focusBorderColor: 'var(--color-primary)',
      focusRingColor: 'var(--color-primary-alpha)',
    },
    soft: {
      border: 'none',
      background: 'var(--color-soft-background)',
      color: 'var(--color-text)',
      focusBackground: 'var(--color-soft-background-hover)',
    },
  },
  
  color: {
    default: {
      border: 'var(--color-default-border)',
      borderSubtle: 'var(--color-default-border-subtle)',
      surface: 'var(--color-default-surface)',
      softBackground: 'var(--color-default-soft)',
      softBackgroundHover: 'var(--color-default-soft-hover)',
      primary: 'var(--color-default-primary)',
      primaryAlpha: 'var(--color-default-primary-alpha)',
      text: 'var(--color-default-text)',
      background: 'var(--color-default-background)',
    },
    info: {
      border: 'var(--color-info-border)',
      borderSubtle: 'var(--color-info-border-subtle)',
      surface: 'var(--color-info-surface)',
      softBackground: 'var(--color-info-soft)',
      softBackgroundHover: 'var(--color-info-soft-hover)',
      primary: 'var(--color-info-primary)',
      primaryAlpha: 'var(--color-info-primary-alpha)',
      text: 'var(--color-info-text)',
      background: 'var(--color-info-background)',
    },
    success: {
      border: 'var(--color-success-border)',
      borderSubtle: 'var(--color-success-border-subtle)',
      surface: 'var(--color-success-surface)',
      softBackground: 'var(--color-success-soft)',
      softBackgroundHover: 'var(--color-success-soft-hover)',
      primary: 'var(--color-success-primary)',
      primaryAlpha: 'var(--color-success-primary-alpha)',
      text: 'var(--color-success-text)',
      background: 'var(--color-success-background)',
    },
    warning: {
      border: 'var(--color-warning-border)',
      borderSubtle: 'var(--color-warning-border-subtle)',
      surface: 'var(--color-warning-surface)',
      softBackground: 'var(--color-warning-soft)',
      softBackgroundHover: 'var(--color-warning-soft-hover)',
      primary: 'var(--color-warning-primary)',
      primaryAlpha: 'var(--color-warning-primary-alpha)',
      text: 'var(--color-warning-text)',
      background: 'var(--color-warning-background)',
    },
    error: {
      border: 'var(--color-error-border)',
      borderSubtle: 'var(--color-error-border-subtle)',
      surface: 'var(--color-error-surface)',
      softBackground: 'var(--color-error-soft)',
      softBackgroundHover: 'var(--color-error-soft-hover)',
      primary: 'var(--color-error-primary)',
      primaryAlpha: 'var(--color-error-primary-alpha)',
      text: 'var(--color-error-text)',
      background: 'var(--color-error-background)',
    },
  },
} as const;

export type Size = '1' | '2' | '3';
export type Variant = 'classic' | 'surface' | 'soft';
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';
export type Color = 'default' | 'info' | 'success' | 'warning' | 'error';

export type ResponsiveSize = Size | {
  initial?: Size;
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
  xl?: Size;
};