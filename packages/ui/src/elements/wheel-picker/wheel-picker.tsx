import '@ncdai/react-wheel-picker/style.css'

import * as WheelPickerPrimitive from '@ncdai/react-wheel-picker'

import { cn } from '@/lib/utils'

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue

type WheelPickerOption<T extends WheelPickerValue = string> = WheelPickerPrimitive.WheelPickerOption<T>

type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames

/**
 * Wraps WheelPickerPrimitive.WheelPickerWrapper and applies a composed className for consistent styling.
 *
 * Merges a set of base styles (including responsive and dark-mode variants) with any `className` provided and renders the underlying WheelPickerWrapper with all received props.
 *
 * @param className - Optional additional class names to merge with the component's base styles.
 * @returns A React element rendering WheelPickerPrimitive.WheelPickerWrapper with merged class names and forwarded props.
 */
function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        'w-56 rounded-lg border border-zinc-200 bg-white px-1 shadow-xs dark:border-zinc-700/80 dark:bg-zinc-900',
        '*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md',
        '*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Render a themed WheelPicker that merges built-in styling with any user-provided classNames.
 *
 * @param classNames - Optional partial classNames to customize `optionItem`, `highlightWrapper`, and `highlightItem` styles; provided values are merged with the component's defaults.
 * @returns The WheelPicker element with merged, theme-aware classNames applied
 */
function WheelPicker<T extends WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: cn('text-zinc-400 data-disabled:opacity-40 dark:text-zinc-500', classNames?.optionItem),
        highlightWrapper: cn(
          'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50',
          'data-rwp-focused:ring-2 data-rwp-focused:ring-zinc-300 data-rwp-focused:ring-inset dark:data-rwp-focused:ring-zinc-600',

          classNames?.highlightWrapper,
        ),
        highlightItem: cn('data-disabled:opacity-40', classNames?.highlightItem),
      }}
      {...props}
    />
  )
}

export { WheelPicker, WheelPickerWrapper }
export type { WheelPickerClassNames, WheelPickerOption, WheelPickerValue }
