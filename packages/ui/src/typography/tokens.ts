// Typography size scale (1-9) based on Radix UI Themes
export const typographyTokens = {
  size: {
    '1': {
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      letterSpacing: '0.0025em',
    },
    '2': {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      letterSpacing: '0em',
    },
    '3': {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      letterSpacing: '0em',
    },
    '4': {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.625rem', // 26px
      letterSpacing: '-0.0025em',
    },
    '5': {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      letterSpacing: '-0.005em',
    },
    '6': {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.875rem', // 30px
      letterSpacing: '-0.00625em',
    },
    '7': {
      fontSize: '1.75rem', // 28px
      lineHeight: '2.25rem', // 36px
      letterSpacing: '-0.0075em',
    },
    '8': {
      fontSize: '2.1875rem', // 35px
      lineHeight: '2.5rem', // 40px
      letterSpacing: '-0.01em',
    },
    '9': {
      fontSize: '3.75rem', // 60px
      lineHeight: '3.75rem', // 60px
      letterSpacing: '-0.025em',
    },
  },

  weight: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },

  color: {
    default: {
      text: 'var(--typography-color-default)',
    },
    primary: {
      text: 'var(--typography-color-primary)',
    },
    neutral: {
      text: 'var(--typography-color-neutral)',
    },
    info: {
      text: 'var(--typography-color-info)',
    },
    success: {
      text: 'var(--typography-color-success)',
    },
    warning: {
      text: 'var(--typography-color-warning)',
    },
    error: {
      text: 'var(--typography-color-error)',
    },
  },
} as const

// Typography size (1-9)
export type TypographySize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

// Font weight
export type Weight = 'light' | 'regular' | 'medium' | 'bold'

// Typography colors
export type TypographyColor = 'default' | 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
