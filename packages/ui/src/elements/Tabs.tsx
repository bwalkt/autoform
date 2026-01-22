'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Color, Size } from './tokens'

// Size configurations for surface variant (segmented control)
const surfaceSizes = {
  '1': {
    list: 'h-8',
    trigger: 'px-2 text-xs',
    content: 'pt-2',
  },
  '2': {
    list: 'h-9',
    trigger: 'px-3 text-sm',
    content: 'pt-3',
  },
  '3': {
    list: 'h-10',
    trigger: 'px-4 text-sm',
    content: 'pt-4',
  },
  '4': {
    list: 'h-12',
    trigger: 'px-5 text-base',
    content: 'pt-5',
  },
}

// Size configurations for line variant (underline style - Radix Themes)
const lineSizes = {
  '1': {
    list: 'h-8',
    trigger: 'px-2 py-1 text-xs',
    content: 'pt-3',
  },
  '2': {
    list: 'h-10',
    trigger: 'px-3 py-1.5 text-sm',
    content: 'pt-4',
  },
  '3': {
    list: 'h-11',
    trigger: 'px-4 py-2 text-sm',
    content: 'pt-4',
  },
  '4': {
    list: 'h-12',
    trigger: 'px-5 py-2 text-base',
    content: 'pt-5',
  },
}

// Variant styles
type TabsVariant = 'surface' | 'line'

// Context for sharing props
interface TabsContextValue {
  size: Size
  variant: TabsVariant
  color: Color
  highContrast: boolean
}

const TabsContext = React.createContext<TabsContextValue>({
  size: '2',
  variant: 'line',
  color: 'default',
  highContrast: false,
})

// ============================================================================
// Root
// ============================================================================

export interface TabsRootProps {
  /** Current active tab value */
  value?: string
  /** Default active tab value */
  defaultValue?: string
  /** Callback when tab changes */
  onValueChange?: (value: string) => void
  /** Size of the tabs */
  size?: Size
  /** Visual variant: "line" (underline) or "surface" (segmented control) */
  variant?: TabsVariant
  /** Accent color */
  color?: Color
  /** Increases color contrast */
  highContrast?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Additional class names */
  className?: string
  /** Children */
  children: React.ReactNode
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      size = '2',
      variant = 'line',
      color = 'default',
      highContrast = false,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TabsContext.Provider value={{ size, variant, color, highContrast }}>
        <TabsPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          orientation={orientation}
          className={cn(orientation === 'vertical' && 'flex gap-4', className)}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    )
  },
)

TabsRoot.displayName = 'Tabs.Root'

// ============================================================================
// List
// ============================================================================

export interface TabsListProps {
  /** Additional class names */
  className?: string
  /** Tab triggers */
  children: React.ReactNode
  /** Justify content alignment (for line variant) */
  justify?: 'start' | 'center' | 'end'
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, justify = 'start', ...props }, ref) => {
    const { size, variant } = React.useContext(TabsContext)
    const sizeConfig = variant === 'surface' ? surfaceSizes[size] : lineSizes[size]

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    }

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          'inline-flex items-center',
          sizeConfig.list,

          // Surface variant (segmented control)
          variant === 'surface' && ['gap-1 rounded-lg bg-muted p-1'],

          // Line variant (underline style)
          variant === 'line' && [
            'gap-1',
            'border-b border-border',
            'overflow-x-auto scrollbar-none',
            justifyClasses[justify],
          ],

          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    )
  },
)

TabsList.displayName = 'Tabs.List'

// Surface variant color styles (segmented control)
const surfaceColorStyles: Record<Color, string> = {
  default: 'aria-selected:text-foreground aria-selected:bg-background aria-selected:shadow',
  primary: 'aria-selected:text-primary aria-selected:bg-primary/10 aria-selected:shadow-sm',
  neutral: 'aria-selected:text-foreground aria-selected:bg-background aria-selected:shadow-sm',
  info: 'aria-selected:text-blue-600 aria-selected:bg-blue-500/10 aria-selected:shadow-sm dark:aria-selected:text-blue-400',
  success:
    'aria-selected:text-green-600 aria-selected:bg-green-500/10 aria-selected:shadow-sm dark:aria-selected:text-green-400',
  warning:
    'aria-selected:text-amber-600 aria-selected:bg-amber-500/10 aria-selected:shadow-sm dark:aria-selected:text-amber-400',
  error:
    'aria-selected:text-red-600 aria-selected:bg-red-500/10 aria-selected:shadow-sm dark:aria-selected:text-red-400',
}

// Line variant indicator color styles (underline)
const lineIndicatorColors: Record<Color, string> = {
  default: 'aria-selected:before:bg-foreground',
  primary: 'aria-selected:before:bg-primary',
  neutral: 'aria-selected:before:bg-foreground',
  info: 'aria-selected:before:bg-blue-600 dark:aria-selected:before:bg-blue-400',
  success: 'aria-selected:before:bg-green-600 dark:aria-selected:before:bg-green-400',
  warning: 'aria-selected:before:bg-amber-600 dark:aria-selected:before:bg-amber-400',
  error: 'aria-selected:before:bg-red-600 dark:aria-selected:before:bg-red-400',
}

// Line variant high contrast indicator colors
const lineIndicatorColorsHighContrast: Record<Color, string> = {
  default: 'aria-selected:before:bg-foreground',
  primary: 'aria-selected:before:bg-primary',
  neutral: 'aria-selected:before:bg-foreground',
  info: 'aria-selected:before:bg-blue-700 dark:aria-selected:before:bg-blue-300',
  success: 'aria-selected:before:bg-green-700 dark:aria-selected:before:bg-green-300',
  warning: 'aria-selected:before:bg-amber-700 dark:aria-selected:before:bg-amber-300',
  error: 'aria-selected:before:bg-red-700 dark:aria-selected:before:bg-red-300',
}

// ============================================================================
// Trigger
// ============================================================================

export interface TabsTriggerProps {
  /** Value of this tab */
  value: string
  /** Whether the tab is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Tab label */
  children: React.ReactNode
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { size, variant, color, highContrast } = React.useContext(TabsContext)
    const sizeConfig = variant === 'surface' ? surfaceSizes[size] : lineSizes[size]

    return (
      <TabsPrimitive.Tab
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'text-muted-foreground',
          sizeConfig.trigger,

          // Surface variant (segmented control)
          variant === 'surface' && ['rounded-md', 'hover:text-foreground', surfaceColorStyles[color]],

          // Line variant (underline style)
          variant === 'line' && [
            'relative rounded-sm',
            'hover:bg-accent/50 hover:text-foreground',
            // Active state text
            'aria-selected:text-foreground aria-selected:font-medium',
            // Underline indicator via ::before
            'before:absolute before:bottom-0 before:left-0 before:right-0',
            'before:h-0.5 before:bg-transparent before:transition-colors',
            // Indicator extends slightly below the border
            'before:-mb-px',
            highContrast ? lineIndicatorColorsHighContrast[color] : lineIndicatorColors[color],
          ],

          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Tab>
    )
  },
)

TabsTrigger.displayName = 'Tabs.Trigger'

// ============================================================================
// Content
// ============================================================================

export interface TabsContentProps {
  /** Value of this tab panel */
  value: string
  /** Whether to force mount */
  forceMount?: boolean
  /** Additional class names */
  className?: string
  /** Tab content */
  children: React.ReactNode
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { size, variant } = React.useContext(TabsContext)
    const sizeConfig = variant === 'surface' ? surfaceSizes[size] : lineSizes[size]

    return (
      <TabsPrimitive.Panel
        ref={ref}
        value={value}
        className={cn(
          'ring-offset-background',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          sizeConfig.content,
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Panel>
    )
  },
)

TabsContent.displayName = 'Tabs.Content'

// ============================================================================
// Export compound component
// ============================================================================

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
}
