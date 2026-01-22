'use client'

import * as React from 'react'
import type { Color, Radius, Size, TextFieldVariant } from '@/elements/tokens'
import { getRadiusStyles, getSizeStyles } from '@/elements/utils'
import { cn } from '@/lib/utils'
import { useFieldGroup } from './FieldGroupContext'
import { colorStyles, solidColorStyles, variantStyles } from './textFieldStyles'

// Re-export for backward compatibility
export type { TextFieldVariant } from '@/elements/tokens'

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The size of the text field */
  size?: Size
  /** The visual variant */
  variant?: TextFieldVariant
  /** The accent color */
  color?: Color
  /** The border radius */
  radius?: Radius
  /** Whether the field has an error */
  error?: boolean
  /** Icon to display on the left (decorative, non-interactive) */
  leftIcon?: React.ReactNode
  /** Icon to display on the right (decorative, non-interactive) */
  rightIcon?: React.ReactNode
  /** Interactive element on the left (e.g., button) */
  leftElement?: React.ReactNode
  /** Interactive element on the right (e.g., toggle button) */
  rightElement?: React.ReactNode
  /** Label text (required for floating-* variants) */
  label?: string
}

// Helper to check if variant is a floating type
const isFloatingVariant = (variant?: TextFieldVariant): boolean => variant?.startsWith('floating-') ?? false

// Get the floating style type from variant
const getFloatingStyle = (variant: TextFieldVariant): 'filled' | 'standard' | 'outlined' | null => {
  if (variant === 'floating-filled') return 'filled'
  if (variant === 'floating-standard') return 'standard'
  if (variant === 'floating-outlined') return 'outlined'
  return null
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      color,
      radius = 'md',
      error = false,
      leftIcon,
      rightIcon,
      leftElement,
      rightElement,
      label,
      className,
      style,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    // Get context values from FieldGroup (if wrapped)
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size
    const variant = variantProp ?? fieldGroup.variant

    const sizeStyles = getSizeStyles(size)
    const radiusStyles = getRadiusStyles(radius)
    const generatedId = React.useId()
    const inputId = id || generatedId

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
      ...style,
    }

    // Determine effective color (error overrides)
    const effectiveColor = error ? 'error' : color

    const floatingStyle = getFloatingStyle(variant)

    // For floating variants, use placeholder as label if no label provided
    // Strip placeholder from props for floating variants to prevent text collision with label
    const { placeholder, ...inputProps } = props
    const effectiveLabel = label || (isFloatingVariant(variant) ? placeholder : undefined)

    // If floating variant, render the floating version
    if (isFloatingVariant(variant)) {
      return (
        <div className={cn('relative w-full', className)} style={combinedStyles}>
          {leftIcon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
              <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {leftIcon}
              </div>
            </div>
          )}

          {leftElement && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] z-10">
              {leftElement}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            disabled={disabled}
            className={cn(
              'peer w-full outline-none transition-all duration-150 ease-in-out',
              'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
              'text-foreground placeholder-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',

              // Floating label specific styles
              floatingStyle === 'filled' && [
                'rounded-t-[var(--element-border-radius)] rounded-b-none',
                'px-[var(--element-padding-x)] pt-5 pb-2',
                'bg-secondary border-0 border-b-2 border-input',
                'focus:border-primary',
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === 'outlined' && [
                'rounded-[var(--element-border-radius)]',
                'px-[var(--element-padding-x)] pt-4 pb-2',
                'bg-transparent border border-input',
                'focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === 'standard' && [
                'rounded-none',
                'px-0 pt-4 pb-2',
                'bg-transparent border-0 border-b-2 border-input',
                'focus:border-primary',
                effectiveColor && colorStyles[effectiveColor],
              ],

              // Icon/element padding adjustments
              (leftIcon || leftElement) && 'pl-[calc(var(--element-padding-x)*2+1rem)]',
              (rightIcon || rightElement) && 'pr-[calc(var(--element-padding-x)*2+1rem)]',
            )}
            {...inputProps}
          />

          {effectiveLabel && (
            <label
              htmlFor={inputId}
              className={cn(
                'absolute text-[var(--element-font-size)] text-muted-foreground',
                'duration-300 transform origin-[0]',
                'pointer-events-none select-none',

                // Floating label positioning by style
                floatingStyle === 'filled' && [
                  'left-[var(--element-padding-x)] top-4 z-10',
                  '-translate-y-4 scale-75',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                  'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary',
                  (leftIcon || leftElement) && 'left-[calc(var(--element-padding-x)*2+1rem)]',
                ],

                floatingStyle === 'outlined' && [
                  'left-[var(--element-padding-x)] top-2 z-10',
                  '-translate-y-4 scale-75 bg-background px-1',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3',
                  'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-focus:px-1',
                  (leftIcon || leftElement) && 'left-[calc(var(--element-padding-x)*2+1rem)]',
                ],

                floatingStyle === 'standard' && [
                  'left-0 top-3 z-10',
                  '-translate-y-6 scale-75',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                  'peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary',
                  (leftIcon || leftElement) && 'left-[calc(var(--element-padding-x)*2+1rem)]',
                ],

                // Error state
                error && 'text-red-500 peer-focus:text-red-500',
              )}
            >
              {effectiveLabel}
            </label>
          )}

          {rightIcon && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
              <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {rightIcon}
              </div>
            </div>
          )}

          {rightElement && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] z-10">
              {rightElement}
            </div>
          )}
        </div>
      )
    }

    // Regular (non-floating) text field

    return (
      <div className={cn('relative w-full', className)} style={combinedStyles}>
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {leftIcon}
            </div>
          </div>
        )}

        {leftElement && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] z-10">
            {leftElement}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full outline-none transition-all duration-150 ease-in-out',
            'h-[var(--element-height)]',
            'px-[var(--element-padding-x)] py-[var(--element-padding-y)]',
            'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
            'rounded-[var(--element-border-radius)]',

            // Variant styles
            variantStyles[variant],

            // Color overrides (use solidColorStyles for solid variant)
            variant === 'solid'
              ? effectiveColor && solidColorStyles[effectiveColor]
              : effectiveColor && colorStyles[effectiveColor],

            // Icon/element padding adjustments
            (leftIcon || leftElement) && 'pl-[calc(var(--element-padding-x)*2+1rem)]',
            (rightIcon || rightElement) && 'pr-[calc(var(--element-padding-x)*2+1rem)]',

            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          placeholder={placeholder}
          {...inputProps}
        />

        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] pointer-events-none z-10">
            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              {rightIcon}
            </div>
          </div>
        )}

        {rightElement && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(var(--element-padding-x)*2+1rem)] z-10">
            {rightElement}
          </div>
        )}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
