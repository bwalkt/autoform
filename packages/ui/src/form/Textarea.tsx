'use client'

import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import type { Color, Radius, Size, TextFieldVariant } from '@/elements/tokens'
import { getRadiusStyles, getSizeStyles } from '@/elements/utils'
import { cn } from '@/lib/utils'
import { useFieldGroup } from './FieldGroupContext'
import { colorStyles, variantStyles } from './textFieldStyles'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** The size of the textarea */
  size?: Size
  /** The visual variant (includes floating-filled, floating-standard, floating-outlined) */
  variant?: TextFieldVariant
  /** The accent color */
  color?: Color
  /** The border radius */
  radius?: Radius
  /** Whether the field has an error */
  error?: boolean
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /** Label text (required for floating-* variants) */
  label?: string
  /** Enable auto-sizing based on content */
  autoSize?: boolean
  /** Minimum number of rows when autoSize is enabled */
  minRows?: number
  /** Maximum number of rows when autoSize is enabled */
  maxRows?: number
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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size: sizeProp,
      variant: variantProp,
      color,
      radius = 'md',
      error = false,
      resize = 'vertical',
      label,
      autoSize = false,
      minRows,
      maxRows,
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
    const textareaId = id || generatedId

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
    const { placeholder, ...textareaProps } = props
    const effectiveLabel = label || (isFloatingVariant(variant) ? placeholder : undefined)

    // Resize classes - disable resize when autoSize is enabled
    const effectiveResize = autoSize ? 'none' : resize
    const resizeClass =
      effectiveResize === 'none'
        ? 'resize-none'
        : effectiveResize === 'vertical'
          ? 'resize-y'
          : effectiveResize === 'horizontal'
            ? 'resize-x'
            : 'resize'

    // Common textarea element to use (native or autosize)
    const TextareaElement = autoSize ? TextareaAutosize : 'textarea'

    // AutoSize specific props
    const autoSizeProps = autoSize ? { minRows, maxRows } : {}

    // If floating variant, render the floating version
    if (isFloatingVariant(variant)) {
      return (
        <div className={cn('relative w-full', className)} style={combinedStyles}>
          <TextareaElement
            ref={ref}
            id={textareaId}
            placeholder=" "
            disabled={disabled}
            className={cn(
              'peer w-full outline-none transition-all duration-150 ease-in-out',
              !autoSize && 'min-h-[calc(var(--element-height)*2)]',
              'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
              'text-foreground placeholder-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              resizeClass,

              // Floating label specific styles
              floatingStyle === 'filled' && [
                'rounded-t-[var(--element-border-radius)] rounded-b-none',
                'px-[var(--element-padding-x)] pt-6 pb-2',
                'bg-secondary border-0 border-b-2 border-input',
                'focus:border-primary',
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === 'outlined' && [
                'rounded-[var(--element-border-radius)]',
                'px-[var(--element-padding-x)] pt-5 pb-2',
                'bg-transparent border border-input',
                'focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',
                effectiveColor && colorStyles[effectiveColor],
              ],

              floatingStyle === 'standard' && [
                'rounded-none',
                'px-0 pt-5 pb-2',
                'bg-transparent border-0 border-b-2 border-input',
                'focus:border-primary',
                effectiveColor && colorStyles[effectiveColor],
              ],
            )}
            {...autoSizeProps}
            {...textareaProps}
          />

          {effectiveLabel && (
            <label
              htmlFor={textareaId}
              className={cn(
                'absolute text-[var(--element-font-size)] text-muted-foreground',
                'duration-300 transform origin-[0]',
                'pointer-events-none select-none',

                // Floating label positioning by style
                floatingStyle === 'filled' && [
                  'left-[var(--element-padding-x)] top-4 z-10',
                  '-translate-y-3 scale-75',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                  'peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary',
                ],

                floatingStyle === 'outlined' && [
                  'left-[var(--element-padding-x)] top-2 z-10',
                  '-translate-y-4 scale-75 bg-background px-1',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3',
                  'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-focus:px-1',
                ],

                floatingStyle === 'standard' && [
                  'left-0 top-4 z-10',
                  '-translate-y-5 scale-75',
                  'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                  'peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary',
                ],

                // Error state
                error && 'text-red-500 peer-focus:text-red-500',
              )}
            >
              {effectiveLabel}
            </label>
          )}
        </div>
      )
    }

    // Regular (non-floating) textarea
    return (
      <TextareaElement
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full outline-none transition-all duration-150 ease-in-out',
          !autoSize && 'min-h-[calc(var(--element-height)*2)]',
          'px-[var(--element-padding-x)] py-[var(--element-padding-y)]',
          'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
          'rounded-[var(--element-border-radius)]',
          resizeClass,

          // Variant styles
          variantStyles[variant],

          // Color overrides
          effectiveColor && colorStyles[effectiveColor],

          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',

          className,
        )}
        style={combinedStyles as React.CSSProperties}
        disabled={disabled}
        placeholder={placeholder}
        {...autoSizeProps}
        {...textareaProps}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
