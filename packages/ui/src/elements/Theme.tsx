'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Theme Types
// ============================================================================

export type Appearance = 'light' | 'dark' | 'inherit'

export type AccentColor =
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky'

export type GrayColor = 'auto' | 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand'

export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type Scaling = '90%' | '95%' | '100%' | '105%' | '110%'

export type PanelBackground = 'solid' | 'translucent'

export interface ThemeLocale {
  locale: string
  language: string
  country?: string
  timezone: string
}

export interface ThemeCalendar {
  radius: Radius
  locale?: string
  timezone?: string
}

// ============================================================================
// Gray Color Matching
// ============================================================================

const accentToGrayMap: Record<AccentColor, GrayColor> = {
  gray: 'gray',
  gold: 'sand',
  bronze: 'sand',
  brown: 'sand',
  yellow: 'sand',
  amber: 'sand',
  orange: 'sand',
  tomato: 'mauve',
  red: 'mauve',
  ruby: 'mauve',
  crimson: 'mauve',
  pink: 'mauve',
  plum: 'mauve',
  purple: 'mauve',
  violet: 'mauve',
  iris: 'slate',
  indigo: 'slate',
  blue: 'slate',
  cyan: 'slate',
  teal: 'sage',
  jade: 'sage',
  green: 'sage',
  grass: 'sage',
  lime: 'olive',
  mint: 'sage',
  sky: 'slate',
}

function getMatchingGrayColor(accentColor: AccentColor): GrayColor {
  return accentToGrayMap[accentColor] || 'gray'
}

// ============================================================================
// Theme Context
// ============================================================================

export interface ThemeContextValue {
  appearance: Appearance
  accentColor: AccentColor
  grayColor: GrayColor
  resolvedGrayColor: GrayColor
  radius: Radius
  locale: ThemeLocale
  calendar: ThemeCalendar
  scaling: Scaling
  panelBackground: PanelBackground
  hasBackground: boolean
  // Change handlers
  onAppearanceChange: (appearance: Appearance) => void
  onAccentColorChange: (accentColor: AccentColor) => void
  onGrayColorChange: (grayColor: GrayColor) => void
  onRadiusChange: (radius: Radius) => void
  onLocaleChange: (locale: Partial<ThemeLocale>) => void
  onCalendarChange: (calendar: Partial<ThemeCalendar>) => void
  onScalingChange: (scaling: Scaling) => void
  onPanelBackgroundChange: (panelBackground: PanelBackground) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

/** useThemeContext export. */
export function useThemeContext() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a Theme component')
  }
  return context
}

// ============================================================================
// Theme Props
// ============================================================================

export interface ThemeProps {
  /** Visual appearance mode */
  appearance?: Appearance
  /** Accent color for interactive elements */
  accentColor?: AccentColor
  /** Gray color palette */
  grayColor?: GrayColor
  /** Border radius scale */
  radius?: Radius
  /** Global locale metadata used by date/time-aware components */
  locale?: Partial<ThemeLocale>
  /** Calendar-specific defaults */
  calendar?: Partial<ThemeCalendar>
  /** UI scaling factor */
  scaling?: Scaling
  /** Panel background style */
  panelBackground?: PanelBackground
  /** Whether to render a background */
  hasBackground?: boolean
  /** Callback when appearance changes */
  onAppearanceChange?: (appearance: Appearance) => void
  /** Callback when accent color changes */
  onAccentColorChange?: (accentColor: AccentColor) => void
  /** Callback when gray color changes */
  onGrayColorChange?: (grayColor: GrayColor) => void
  /** Callback when radius changes */
  onRadiusChange?: (radius: Radius) => void
  /** Callback when locale metadata changes */
  onLocaleChange?: (locale: ThemeLocale) => void
  /** Callback when calendar defaults change */
  onCalendarChange?: (calendar: ThemeCalendar) => void
  /** Callback when scaling changes */
  onScalingChange?: (scaling: Scaling) => void
  /** Callback when panel background changes */
  onPanelBackgroundChange?: (panelBackground: PanelBackground) => void
  /** Render as child element */
  asChild?: boolean
  /** Additional class names */
  className?: string
  /** Children elements */
  children: React.ReactNode
}

// ============================================================================
// Theme Component
// ============================================================================

/** Theme export. */
export const Theme = React.forwardRef<HTMLDivElement, ThemeProps>(
  (
    {
      appearance: appearanceProp = 'inherit',
      accentColor: accentColorProp = 'indigo',
      grayColor: grayColorProp = 'auto',
      radius: radiusProp = 'md',
      locale: localeProp,
      calendar: calendarProp,
      scaling: scalingProp = '100%',
      panelBackground: panelBackgroundProp = 'translucent',
      hasBackground: hasBackgroundProp = true,
      onAppearanceChange: onAppearanceChangeProp,
      onAccentColorChange: onAccentColorChangeProp,
      onGrayColorChange: onGrayColorChangeProp,
      onRadiusChange: onRadiusChangeProp,
      onLocaleChange: onLocaleChangeProp,
      onCalendarChange: onCalendarChangeProp,
      onScalingChange: onScalingChangeProp,
      onPanelBackgroundChange: onPanelBackgroundChangeProp,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // State for controlled/uncontrolled mode
    const [appearance, setAppearance] = React.useState<Appearance>(appearanceProp)
    const [accentColor, setAccentColor] = React.useState<AccentColor>(accentColorProp)
    const [grayColor, setGrayColor] = React.useState<GrayColor>(grayColorProp)
    const [radius, setRadius] = React.useState<Radius>(radiusProp)
    const [locale, setLocale] = React.useState<ThemeLocale>(() => getResolvedLocale(localeProp))
    const [calendar, setCalendar] = React.useState<ThemeCalendar>(() =>
      getResolvedCalendar(calendarProp, radiusProp, localeProp),
    )
    const [scaling, setScaling] = React.useState<Scaling>(scalingProp)
    const [panelBackground, setPanelBackground] = React.useState<PanelBackground>(panelBackgroundProp)

    // Sync with props
    React.useEffect(() => setAppearance(appearanceProp), [appearanceProp])
    React.useEffect(() => setAccentColor(accentColorProp), [accentColorProp])
    React.useEffect(() => setGrayColor(grayColorProp), [grayColorProp])
    React.useEffect(() => setRadius(radiusProp), [radiusProp])
    React.useEffect(() => setLocale(getResolvedLocale(localeProp)), [localeProp])
    React.useEffect(
      () => setCalendar(getResolvedCalendar(calendarProp, radius, locale)),
      [calendarProp, radius, locale],
    )
    React.useEffect(() => setScaling(scalingProp), [scalingProp])
    React.useEffect(() => setPanelBackground(panelBackgroundProp), [panelBackgroundProp])

    // Resolve gray color
    const resolvedGrayColor = grayColor === 'auto' ? getMatchingGrayColor(accentColor) : grayColor

    // Change handlers
    const handleAppearanceChange = React.useCallback(
      (value: Appearance) => {
        setAppearance(value)
        onAppearanceChangeProp?.(value)
      },
      [onAppearanceChangeProp],
    )

    const handleAccentColorChange = React.useCallback(
      (value: AccentColor) => {
        setAccentColor(value)
        onAccentColorChangeProp?.(value)
      },
      [onAccentColorChangeProp],
    )

    const handleGrayColorChange = React.useCallback(
      (value: GrayColor) => {
        setGrayColor(value)
        onGrayColorChangeProp?.(value)
      },
      [onGrayColorChangeProp],
    )

    const handleRadiusChange = React.useCallback(
      (value: Radius) => {
        setRadius(value)
        onRadiusChangeProp?.(value)
      },
      [onRadiusChangeProp],
    )

    const handleLocaleChange = React.useCallback(
      (value: Partial<ThemeLocale>) => {
        setLocale(previous => {
          const next = getResolvedLocale({ ...previous, ...value })
          onLocaleChangeProp?.(next)
          return next
        })
      },
      [onLocaleChangeProp],
    )

    const handleCalendarChange = React.useCallback(
      (value: Partial<ThemeCalendar>) => {
        setCalendar(previous => {
          const next = getResolvedCalendar({ ...previous, ...value }, radius, locale)
          onCalendarChangeProp?.(next)
          return next
        })
      },
      [onCalendarChangeProp, radius, locale],
    )

    const handleScalingChange = React.useCallback(
      (value: Scaling) => {
        setScaling(value)
        onScalingChangeProp?.(value)
      },
      [onScalingChangeProp],
    )

    const handlePanelBackgroundChange = React.useCallback(
      (value: PanelBackground) => {
        setPanelBackground(value)
        onPanelBackgroundChangeProp?.(value)
      },
      [onPanelBackgroundChangeProp],
    )

    // Context value
    const contextValue: ThemeContextValue = {
      appearance,
      accentColor,
      grayColor,
      resolvedGrayColor,
      radius,
      locale,
      calendar,
      scaling,
      panelBackground,
      hasBackground: hasBackgroundProp,
      onAppearanceChange: handleAppearanceChange,
      onAccentColorChange: handleAccentColorChange,
      onGrayColorChange: handleGrayColorChange,
      onRadiusChange: handleRadiusChange,
      onLocaleChange: handleLocaleChange,
      onCalendarChange: handleCalendarChange,
      onScalingChange: handleScalingChange,
      onPanelBackgroundChange: handlePanelBackgroundChange,
    }

    // CSS custom properties for theming
    const themeStyles: React.CSSProperties = {
      '--theme-accent-color': accentColor,
      '--theme-gray-color': resolvedGrayColor,
      '--theme-radius': getRadiusValue(radius),
      '--theme-calendar-radius': getRadiusValue(calendar.radius),
      '--theme-scaling': scaling,
    } as React.CSSProperties

    const themeClassName = cn(
      'radix-themes',
      appearance === 'light' && 'light',
      appearance === 'dark' && 'dark',
      hasBackgroundProp && 'bg-background text-foreground',
      className,
    )

    const themeDataAttributes = {
      'data-accent-color': accentColor,
      'data-gray-color': resolvedGrayColor,
      'data-radius': radius,
      'data-locale': locale.locale,
      'data-language': locale.language,
      'data-country': locale.country,
      'data-timezone': locale.timezone,
      'data-calendar-radius': calendar.radius,
      'data-scaling': scaling,
      'data-panel-background': panelBackground,
      'data-has-background': hasBackgroundProp,
    }

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string
        style?: React.CSSProperties
        ref?: React.Ref<HTMLElement>
      }>

      return (
        <ThemeContext.Provider value={contextValue}>
          {React.cloneElement(child, {
            ref,
            className: cn(child.props.className, themeClassName),
            style: { ...themeStyles, ...child.props.style },
            ...themeDataAttributes,
            ...props,
          })}
        </ThemeContext.Provider>
      )
    }

    return (
      <ThemeContext.Provider value={contextValue}>
        <div ref={ref} className={themeClassName} style={themeStyles} {...themeDataAttributes} {...props}>
          {children}
        </div>
      </ThemeContext.Provider>
    )
  },
)

Theme.displayName = 'Theme'

// ============================================================================
// Helper Functions
// ============================================================================

function getRadiusValue(radius: Radius): string {
  switch (radius) {
    case 'none':
      return '0'
    case 'sm':
      return '0.25rem'
    case 'md':
      return '0.375rem'
    case 'lg':
      return '0.5rem'
    case 'full':
      return '9999px'
    default:
      return '0.375rem'
  }
}

function getResolvedLocale(locale?: Partial<ThemeLocale>): ThemeLocale {
  const defaults = getDefaultLocale()
  const resolvedLocale = locale?.locale ?? defaults.locale
  const [languageFromLocale, countryFromLocale] = resolvedLocale.split('-')
  return {
    locale: resolvedLocale,
    language: locale?.language ?? languageFromLocale ?? defaults.language,
    country: locale?.country ?? countryFromLocale ?? defaults.country,
    timezone: locale?.timezone ?? defaults.timezone,
  }
}

function getResolvedCalendar(
  calendar: Partial<ThemeCalendar> | undefined,
  radius: Radius,
  locale: Partial<ThemeLocale> | ThemeLocale | undefined,
): ThemeCalendar {
  const resolvedLocale = getResolvedLocale(locale)
  return {
    radius: calendar?.radius ?? radius,
    locale: calendar?.locale ?? resolvedLocale.locale,
    timezone: calendar?.timezone ?? resolvedLocale.timezone,
  }
}

function getDefaultLocale(): ThemeLocale {
  try {
    const resolved = new Intl.DateTimeFormat().resolvedOptions()
    const locale = resolved.locale || 'en-US'
    const [language, country] = locale.split('-')
    return {
      locale,
      language: language || 'en',
      country: country || 'US',
      timezone: resolved.timeZone || 'UTC',
    }
  } catch {
    return {
      locale: 'en-US',
      language: 'en',
      country: 'US',
      timezone: 'UTC',
    }
  }
}
