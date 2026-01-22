'use client'

import { Check, ChevronDown, X } from 'lucide-react'
import * as React from 'react'
import type { Color, Radius, Size, Variant } from '@/elements/tokens'
import { getRadiusStyles, getSizeStyles } from '@/elements/utils'
import { cn } from '@/lib/utils'
import { useFieldGroup } from './FieldGroupContext'

// ============================================================================
// Types
// ============================================================================

export interface MultiSelectOption {
  /** Unique value for the option */
  value: string
  /** Display label for the option */
  label: string
  /** Optional icon */
  icon?: React.ReactNode
  /** Whether the option is disabled */
  disabled?: boolean
}

export interface MultiSelectProps {
  /** Available options */
  options: MultiSelectOption[]
  /** Selected values */
  value?: string[]
  /** Called when selection changes */
  onChange?: (value: string[]) => void
  /** Placeholder when no items selected */
  placeholder?: string
  /** Maximum number of items that can be selected */
  maxSelected?: number
  /** The size of the component */
  size?: Size
  /** The visual variant */
  variant?: Variant
  /** The accent color */
  color?: Color
  /** The border radius */
  radius?: Radius
  /** Whether the field has an error */
  error?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Additional class name */
  className?: string
  /** Text shown when max items selected */
  maxSelectedText?: string
  /** Whether to show selected items as badges */
  showBadges?: boolean
  /** Whether to allow searching/filtering options */
  searchable?: boolean
  /** Search placeholder text */
  searchPlaceholder?: string
}

// ============================================================================
// Badge Component (Internal)
// ============================================================================

interface BadgeProps {
  children: React.ReactNode
  onRemove?: () => void
  disabled?: boolean
}

const Badge: React.FC<BadgeProps> = ({ children, onRemove, disabled }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
      'bg-primary/10 text-primary',
      disabled && 'opacity-50',
    )}
  >
    {children}
    {onRemove && !disabled && (
      <button
        type="button"
        onClick={e => {
          e.stopPropagation()
          onRemove()
        }}
        className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label="Remove"
      >
        <X className="h-3 w-3" />
      </button>
    )}
  </span>
)

// ============================================================================
// Main Component
// ============================================================================

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = 'Select items...',
      maxSelected,
      size: sizeProp,
      variant: variantProp,
      color: _color,
      radius = 'md',
      error = false,
      disabled = false,
      className,
      maxSelectedText = 'Max items selected',
      showBadges = true,
      searchable = true,
      searchPlaceholder = 'Search...',
    },
    ref,
  ) => {
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size
    const variant = variantProp ?? fieldGroup.variant

    const sizeStyles = getSizeStyles(size)
    const radiusStyles = getRadiusStyles(radius)
    const combinedStyles = { ...sizeStyles, ...radiusStyles }

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!search) return options
      const searchLower = search.toLowerCase()
      return options.filter(opt => opt.label.toLowerCase().includes(searchLower))
    }, [options, search])

    // Get selected options
    const selectedOptions = React.useMemo(() => options.filter(opt => value.includes(opt.value)), [options, value])

    // Check if max selected reached
    const isMaxReached = maxSelected !== undefined && value.length >= maxSelected

    // Handle option toggle
    const toggleOption = React.useCallback(
      (optionValue: string) => {
        if (disabled) return

        const isSelected = value.includes(optionValue)
        let newValue: string[]

        if (isSelected) {
          newValue = value.filter(v => v !== optionValue)
        } else {
          if (isMaxReached) return
          newValue = [...value, optionValue]
        }

        onChange?.(newValue)
      },
      [value, onChange, disabled, isMaxReached],
    )

    // Handle remove badge
    const handleRemove = React.useCallback(
      (optionValue: string) => {
        if (disabled) return
        onChange?.(value.filter(v => v !== optionValue))
      },
      [value, onChange, disabled],
    )

    // Handle click outside to close
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [open])

    // Reset search when closing
    React.useEffect(() => {
      if (!open) setSearch('')
    }, [open])

    return (
      <div ref={ref} className={cn('relative w-full', className)}>
        {/* Trigger - using div with button semantics to avoid nested button issue with Badge remove buttons */}
        <div
          ref={triggerRef}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          onKeyDown={e => {
            if (disabled) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpen(prev => !prev)
            }
          }}
          className={cn(
            'inline-flex items-center justify-between w-full outline-none transition-all duration-150 ease-in-out',
            'min-h-[var(--element-height)]',
            'px-[var(--element-padding-x)] py-[var(--element-padding-y)]',
            'text-[var(--element-font-size)] leading-[var(--element-line-height)]',
            'rounded-[var(--element-border-radius)]',
            'text-left',

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
              'hover:bg-accent/50',
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
            error && ['border-destructive focus:border-destructive', 'focus:ring-destructive/20'],

            // Disabled state
            disabled && ['opacity-50 cursor-not-allowed'],
          )}
          style={combinedStyles}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <div className="flex-1 flex flex-wrap gap-1">
            {showBadges && selectedOptions.length > 0 ? (
              selectedOptions.map(opt => (
                <Badge key={opt.value} onRemove={() => handleRemove(opt.value)} disabled={disabled}>
                  {opt.icon}
                  {opt.label}
                </Badge>
              ))
            ) : selectedOptions.length > 0 ? (
              <span>{selectedOptions.length} selected</span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={cn('h-4 w-4 opacity-50 ml-2 shrink-0 transition-transform', open && 'rotate-180')} />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className={cn(
              'absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
              'animate-in fade-in-0 zoom-in-95',
            )}
          >
            {/* Search Input */}
            {searchable && (
              <div className="flex items-center border-b px-3 py-2">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            )}

            {/* Max selected message */}
            {isMaxReached && <div className="px-3 py-2 text-xs text-muted-foreground border-b">{maxSelectedText}</div>}

            {/* Options List */}
            <div className="max-h-[200px] overflow-y-auto p-1" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">No options found</div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = value.includes(option.value)
                  const isDisabled = option.disabled || (isMaxReached && !isSelected)

                  return (
                    <div
                      key={option.value}
                      onClick={() => !isDisabled && toggleOption(option.value)}
                      onKeyDown={e => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                          e.preventDefault()
                          toggleOption(option.value)
                        }
                      }}
                      className={cn(
                        'relative flex items-center rounded-sm py-1.5 pl-2 pr-8 text-sm cursor-pointer',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                        isSelected && 'bg-accent/50',
                        isDisabled && 'opacity-50 cursor-not-allowed',
                      )}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={isDisabled ? -1 : 0}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                      {isSelected && (
                        <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
