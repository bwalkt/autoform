'use client'

/**
 * SwitchGroup - A component for managing multiple switches with shared state.
 *
 * Similar to CheckboxGroup but using switch toggles instead of checkboxes.
 * Manages an array of selected values and provides consistent styling across all switches.
 *
 * @example
 * ```tsx
 * <SwitchGroup.Root defaultValue={['notifications']} onValueChange={setSettings}>
 *   <SwitchGroup.Item name="notifications" label="Push notifications" />
 *   <SwitchGroup.Item name="emails" label="Email updates" description="Weekly digest" />
 *   <SwitchGroup.Item name="sms" label="SMS alerts" />
 * </SwitchGroup.Root>
 * ```
 *
 * @module SwitchGroup
 */

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import * as React from 'react'
import type { Color, Radius, Size } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { Text } from '@/typography'
import { useFieldGroup } from './FieldGroupContext'
import { Label } from './Label'

// Size configurations with CSS values for reliable styling
const switchSizes = {
  '1': {
    rootHeight: '1rem',
    rootWidth: '1.75rem',
    thumbSize: '0.75rem',
    thumbTranslate: '0.75rem',
    textSize: '1' as const,
    gapClass: 'gap-1.5',
  },
  '2': {
    rootHeight: '1.25rem',
    rootWidth: '2.25rem',
    thumbSize: '1rem',
    thumbTranslate: '1rem',
    textSize: '2' as const,
    gapClass: 'gap-2',
  },
  '3': {
    rootHeight: '1.5rem',
    rootWidth: '2.75rem',
    thumbSize: '1.25rem',
    thumbTranslate: '1.25rem',
    textSize: '2' as const,
    gapClass: 'gap-2.5',
  },
  '4': {
    rootHeight: '1.75rem',
    rootWidth: '3.5rem',
    thumbSize: '1.5rem',
    thumbTranslate: '1.75rem',
    textSize: '3' as const,
    gapClass: 'gap-3',
  },
} as const

// Radius styles
const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Color styles for checked state
const colorStyles: Record<Color, string> = {
  default: 'data-[checked]:bg-primary',
  primary: 'data-[checked]:bg-primary',
  neutral: 'data-[checked]:bg-gray-500 dark:data-[checked]:bg-gray-400',
  info: 'data-[checked]:bg-blue-500',
  success: 'data-[checked]:bg-green-500',
  warning: 'data-[checked]:bg-amber-500',
  error: 'data-[checked]:bg-red-500',
}

// Variant styles
type SwitchVariant = 'surface' | 'classic' | 'soft'

// Context for sharing props across switch group
interface SwitchGroupContextValue {
  size: Size
  variant: SwitchVariant
  color: Color
  radius: Radius
  disabled?: boolean
  values: string[]
  onValueChange: (name: string, checked: boolean) => void
}

const SwitchGroupContext = React.createContext<SwitchGroupContextValue | null>(null)

// ============================================================================
// Root
// ============================================================================

/**
 * Props for the SwitchGroup.Root component.
 */
export interface SwitchGroupRootProps {
  /** The size of all switches in the group */
  size?: Size
  /** The visual variant of all switches */
  variant?: SwitchVariant
  /** The accent color of all switches */
  color?: Color
  /** Border radius */
  radius?: Radius
  /** The controlled value - array of checked switch names */
  value?: string[]
  /** The default value for uncontrolled usage */
  defaultValue?: string[]
  /** Callback when values change */
  onValueChange?: (value: string[]) => void
  /** Whether all switches are disabled */
  disabled?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Additional class names */
  className?: string
  /** Children elements */
  children: React.ReactNode
}

/**
 * Container component for SwitchGroup that manages the array of selected values.
 * Supports both controlled and uncontrolled usage patterns.
 * Inherits size from FieldGroupContext if not explicitly provided.
 */
const SwitchGroupRoot = React.forwardRef<HTMLDivElement, SwitchGroupRootProps>(
  (
    {
      size: sizeProp,
      variant = 'surface',
      color = 'primary',
      radius = 'full',
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      disabled,
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size

    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
    const isControlled = controlledValue !== undefined
    const values = isControlled ? controlledValue : internalValue

    const handleValueChange = React.useCallback(
      (name: string, checked: boolean) => {
        const newValues = checked ? [...values, name] : values.filter(v => v !== name)

        if (!isControlled) {
          setInternalValue(newValues)
        }
        onValueChange?.(newValues)
      },
      [values, isControlled, onValueChange],
    )

    return (
      <SwitchGroupContext.Provider
        value={{ size, variant, color, radius, disabled, values, onValueChange: handleValueChange }}
      >
        <div
          ref={ref}
          role="group"
          className={cn(
            'flex',
            orientation === 'vertical' && 'flex-col gap-2',
            orientation === 'horizontal' && 'flex-row gap-4',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </SwitchGroupContext.Provider>
    )
  },
)

SwitchGroupRoot.displayName = 'SwitchGroup.Root'

// ============================================================================
// Item
// ============================================================================

/**
 * Props for the SwitchGroup.Item component.
 */
export interface SwitchGroupItemProps {
  /** Unique name/value for this switch */
  name: string
  /** The label text */
  label?: string
  /** Optional description text */
  description?: string
  /** Whether this specific switch is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Children (alternative to label prop) */
  children?: React.ReactNode
}

/**
 * Individual switch within a SwitchGroup.
 * Must be used within a SwitchGroup.Root component.
 * Displays a switch toggle with optional label and description.
 */
const SwitchGroupItem = React.forwardRef<HTMLSpanElement, SwitchGroupItemProps>(
  ({ name, label, description, disabled, className, children, ...props }, ref) => {
    const context = React.useContext(SwitchGroupContext)

    if (!context) {
      throw new Error('SwitchGroup.Item must be used within SwitchGroup.Root')
    }

    const id = React.useId()
    const sizeConfig = switchSizes[context.size]
    const isDisabled = disabled || context.disabled
    const isChecked = context.values.includes(name)
    const displayLabel = label || children

    // Inline styles for reliable sizing
    const rootStyles: React.CSSProperties = {
      height: sizeConfig.rootHeight,
      width: sizeConfig.rootWidth,
    }

    const thumbStyles: React.CSSProperties = {
      width: sizeConfig.thumbSize,
      height: sizeConfig.thumbSize,
    }

    const thumbCheckedTranslate = sizeConfig.thumbTranslate

    return (
      <div className={cn('flex items-start', sizeConfig.gapClass, className)}>
        <SwitchPrimitive.Root
          ref={ref}
          id={id}
          checked={isChecked}
          onCheckedChange={checked => context.onValueChange(name, checked)}
          disabled={isDisabled}
          style={rootStyles}
          className={cn(
            'peer inline-flex shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            radiusStyles[context.radius],
            colorStyles[context.color],
            // Variant styles for unchecked state
            context.variant === 'surface' && 'bg-input',
            context.variant === 'classic' && 'bg-input border-border',
            context.variant === 'soft' && 'bg-secondary/50',
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            style={
              {
                ...thumbStyles,
                '--thumb-translate': thumbCheckedTranslate,
              } as React.CSSProperties
            }
            className={cn(
              'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
              'translate-x-0 data-[checked]:translate-x-[var(--thumb-translate)]',
            )}
          />
        </SwitchPrimitive.Root>

        {displayLabel && (
          <div className="flex flex-col">
            <Label htmlFor={id} size={context.size} disabled={isDisabled}>
              {displayLabel}
            </Label>
            {description && (
              <Text size="1" className="text-muted-foreground mt-0.5">
                {description}
              </Text>
            )}
          </div>
        )}
      </div>
    )
  },
)

SwitchGroupItem.displayName = 'SwitchGroup.Item'

// ============================================================================
// Export compound component
// ============================================================================

export const SwitchGroup = {
  Root: SwitchGroupRoot,
  Item: SwitchGroupItem,
}

export type { SwitchGroupRootProps as SwitchGroupProps }
