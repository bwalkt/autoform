'use client'

import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CheckIcon, ChevronDown } from 'lucide-react'
import * as React from 'react'
import type { Color, Radius, Size, Variant } from '@/elements/tokens'
import { getRadiusStyles, getSizeStyles } from '@/elements/utils'
import { cn } from '@/lib/utils'
import { Text } from '@/typography/Text'
import { useFieldGroup } from './FieldGroupContext'

export interface SelectProps {
  id?: string
  label?: React.ReactNode
  size?: Size
  variant?: Variant
  color?: Color
  radius?: Radius
  error?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: React.ReactNode
}

/** Select export. */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      label,
      size: sizeProp,
      variant: variantProp,
      color,
      radius = 'md',
      error = false,
      placeholder = 'Select...',
      value,
      defaultValue,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const effectiveId = id ?? (label ? generatedId : undefined)
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size
    const variant = variantProp ?? fieldGroup.variant
    const sizeStyles = getSizeStyles(size)
    const radiusStyles = getRadiusStyles(radius)

    const combinedStyles = {
      ...sizeStyles,
      ...radiusStyles,
    }

    const handleValueChange = onValueChange
      ? (newValue: string | null) => {
          if (newValue !== null) {
            onValueChange(newValue)
          }
        }
      : undefined

    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <div className="grid gap-1.5">
          {label ? (
            <Text as="label" size="2" htmlFor={effectiveId} color={error ? 'error' : undefined}>
              {label}
            </Text>
          ) : null}
          <SelectPrimitive.Trigger
            id={effectiveId}
            ref={ref}
            className={cn(
              'inline-flex items-center justify-between w-full outline-none transition-all duration-150 ease-in-out',
              'h-[var(--element-height)]',
              'px-[var(--element-padding-x)] py-[var(--element-padding-y)]',
              'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
              'rounded-[var(--element-border-radius)]',
              'text-[var(--color-text)]',

              // Variant-specific styles
              variant === 'solid' && [
                'border-0',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90',
                'focus:ring-2 focus:ring-ring focus:ring-offset-2',
              ],
              variant === 'outline' && [
                'border border-input',
                'bg-background',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:ring-2 focus:ring-ring focus:ring-offset-2',
              ],
              variant === 'soft' && [
                'border-0',
                'bg-secondary text-secondary-foreground',
                'hover:bg-secondary/80',
                'focus:ring-2 focus:ring-ring focus:ring-offset-2',
              ],
              variant === 'ghost' && [
                'border-0',
                'bg-transparent',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:ring-2 focus:ring-ring focus:ring-offset-2',
              ],

              // Error state
              error && [
                'border-destructive focus:border-destructive',
                'focus:ring-destructive/20',
                variant === 'soft' && 'bg-destructive/10',
              ],

              // Disabled state
              disabled && ['opacity-50 cursor-not-allowed'],
            )}
            style={combinedStyles}
            {...props}
          >
            <SelectPrimitive.Value>
              {(selectedValue: string | null) =>
                selectedValue || <span className="text-muted-foreground">{placeholder}</span>
              }
            </SelectPrimitive.Value>
            <SelectPrimitive.Icon render={<ChevronDown className="h-4 w-4 opacity-50 ml-2" />} />
          </SelectPrimitive.Trigger>
        </div>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner sideOffset={4} className="z-50">
            <SelectPrimitive.Popup
              className={cn(
                'relative min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md',
                'data-open:animate-in data-closed:animate-out',
                'data-closed:fade-out-0 data-open:fade-in-0',
                'data-closed:zoom-out-95 data-open:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              )}
            >
              <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  },
)

Select.displayName = 'Select'

/** SelectItem export. */
export function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
      >
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

SelectItem.displayName = 'SelectItem'
