'use client'

import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import * as React from 'react'
import type { Color, Size } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { useFieldGroup } from './FieldGroupContext'

// Size configurations
const radioCardSizes = {
  '1': {
    padding: 'p-2',
    gap: 'gap-2',
    indicatorSize: '0.75rem',
    textSize: 'text-xs',
  },
  '2': {
    padding: 'p-3',
    gap: 'gap-3',
    indicatorSize: '1rem',
    textSize: 'text-sm',
  },
  '3': {
    padding: 'p-4',
    gap: 'gap-4',
    indicatorSize: '1.25rem',
    textSize: 'text-base',
  },
  '4': {
    padding: 'p-5',
    gap: 'gap-5',
    indicatorSize: '1.5rem',
    textSize: 'text-lg',
  },
} as const

// Variant styles
type RadioCardsVariant = 'surface' | 'classic'

// Color styles for selected state
const colorStyles: Record<Color, string> = {
  default: 'data-[checked]:border-primary data-[checked]:ring-primary/20',
  primary: 'data-[checked]:border-primary data-[checked]:ring-primary/20',
  neutral:
    'data-[checked]:border-gray-500 data-[checked]:ring-gray-500/20 dark:data-[checked]:border-gray-400 dark:data-[checked]:ring-gray-400/20',
  info: 'data-[checked]:border-blue-500 data-[checked]:ring-blue-500/20',
  success: 'data-[checked]:border-green-500 data-[checked]:ring-green-500/20',
  warning: 'data-[checked]:border-amber-500 data-[checked]:ring-amber-500/20',
  error: 'data-[checked]:border-red-500 data-[checked]:ring-red-500/20',
}

// Indicator color styles
const indicatorColorStyles: Record<Color, string> = {
  default: 'data-[checked]:border-primary data-[checked]:bg-primary',
  primary: 'data-[checked]:border-primary data-[checked]:bg-primary',
  neutral:
    'data-[checked]:border-gray-500 data-[checked]:bg-gray-500 dark:data-[checked]:border-gray-400 dark:data-[checked]:bg-gray-400',
  info: 'data-[checked]:border-blue-500 data-[checked]:bg-blue-500',
  success: 'data-[checked]:border-green-500 data-[checked]:bg-green-500',
  warning: 'data-[checked]:border-amber-500 data-[checked]:bg-amber-500',
  error: 'data-[checked]:border-red-500 data-[checked]:bg-red-500',
}

// Context for sharing props
interface RadioCardsContextValue {
  size: Size
  variant: RadioCardsVariant
  color: Color
  disabled?: boolean
}

const RadioCardsContext = React.createContext<RadioCardsContextValue>({
  size: '2',
  variant: 'surface',
  color: 'default',
})

// ============================================================================
// Root
// ============================================================================

export interface RadioCardsRootProps {
  /** Size of the radio cards */
  size?: Size
  /** Visual variant */
  variant?: RadioCardsVariant
  /** Color theme */
  color?: Color
  /** Current value */
  value?: string
  /** Default value */
  defaultValue?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Whether all cards are disabled */
  disabled?: boolean
  /** Grid columns - can be a number or CSS grid template */
  columns?: number | string
  /** Gap between cards */
  gap?: '1' | '2' | '3' | '4' | '5' | '6'
  /** Additional class names */
  className?: string
  /** Children */
  children: React.ReactNode
}

const gapSizes = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
}

const RadioCardsRoot = React.forwardRef<HTMLDivElement, RadioCardsRootProps>(
  (
    {
      size: sizeProp,
      variant = 'surface',
      color = 'default',
      value,
      defaultValue,
      onValueChange,
      disabled,
      columns = 'repeat(auto-fit, minmax(160px, 1fr))',
      gap = '4',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size

    const handleValueChange = React.useCallback(
      (newValue: unknown) => {
        if (onValueChange && typeof newValue === 'string') {
          onValueChange(newValue)
        }
      },
      [onValueChange],
    )

    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    }

    return (
      <RadioCardsContext.Provider value={{ size, variant, color, disabled }}>
        <RadioGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          className={cn('grid', gapSizes[gap], className)}
          style={gridStyle}
          {...props}
        >
          {children}
        </RadioGroupPrimitive>
      </RadioCardsContext.Provider>
    )
  },
)

RadioCardsRoot.displayName = 'RadioCards.Root'

// ============================================================================
// Item
// ============================================================================

export interface RadioCardsItemProps {
  /** Value of this radio card */
  value: string
  /** Whether this card is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Children content */
  children: React.ReactNode
}

const RadioCardsItem = React.forwardRef<HTMLButtonElement, RadioCardsItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const context = React.useContext(RadioCardsContext)
    const sizeConfig = radioCardSizes[context.size]
    const isDisabled = disabled || context.disabled

    // Indicator size styles
    const indicatorOuterSize = sizeConfig.indicatorSize
    const indicatorInnerSize = `calc(${sizeConfig.indicatorSize} * 0.5)`

    const indicatorOuterStyles: React.CSSProperties = {
      width: indicatorOuterSize,
      height: indicatorOuterSize,
    }

    const indicatorInnerStyles: React.CSSProperties = {
      width: indicatorInnerSize,
      height: indicatorInnerSize,
    }

    return (
      <RadioPrimitive.Root
        ref={ref}
        value={value}
        disabled={isDisabled}
        className={cn(
          'group relative flex cursor-pointer rounded-lg border bg-card text-left transition-all',
          sizeConfig.padding,
          // Variant styles
          context.variant === 'surface' && 'border-border shadow-sm',
          context.variant === 'classic' && 'border-border shadow-md',
          // Selected styles
          'data-[checked]:ring-2',
          colorStyles[context.color],
          // Hover state
          'hover:bg-accent/50',
          // Focus state
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          // Disabled state
          isDisabled && 'cursor-not-allowed opacity-50 hover:bg-card',
          className,
        )}
        {...props}
      >
        <div className={cn('flex w-full items-start', sizeConfig.gap)}>
          {/* Radio indicator */}
          <span
            style={indicatorOuterStyles}
            className={cn(
              'mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full',
              'border-2 border-input bg-background',
              'transition-all duration-150',
              indicatorColorStyles[context.color],
            )}
          >
            <RadioPrimitive.Indicator style={indicatorInnerStyles} className="rounded-full bg-white" />
          </span>
          {/* Content */}
          <div className={cn('flex-1', sizeConfig.textSize)}>{children}</div>
        </div>
      </RadioPrimitive.Root>
    )
  },
)

RadioCardsItem.displayName = 'RadioCards.Item'

// ============================================================================
// Export compound component
// ============================================================================

export const RadioCards = {
  Root: RadioCardsRoot,
  Item: RadioCardsItem,
}
