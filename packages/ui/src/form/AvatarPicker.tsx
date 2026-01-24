'use client'

import { Check, ChevronDown, Search, X } from 'lucide-react'
import * as React from 'react'
import type { Color, Size } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { Checkbox } from './Checkbox'
import { useFieldGroup } from './FieldGroupContext'
import { highlightColorStyles } from './textFieldStyles'

// Size configurations
const sizeStyles: Record<Size, { trigger: string; dropdown: string; item: string; avatar: string }> = {
  '1': {
    trigger: 'h-7 text-xs px-2 gap-1',
    dropdown: 'text-xs',
    item: 'px-2 py-1 gap-1.5',
    avatar: 'w-5 h-5 text-[10px]',
  },
  '2': {
    trigger: 'h-8 text-sm px-2.5 gap-1.5',
    dropdown: 'text-sm',
    item: 'px-2.5 py-1.5 gap-2',
    avatar: 'w-6 h-6 text-xs',
  },
  '3': {
    trigger: 'h-9 text-sm px-3 gap-2',
    dropdown: 'text-sm',
    item: 'px-3 py-2 gap-2',
    avatar: 'w-7 h-7 text-xs',
  },
  '4': {
    trigger: 'h-10 text-base px-3 gap-2',
    dropdown: 'text-base',
    item: 'px-3 py-2.5 gap-2.5',
    avatar: 'w-8 h-8 text-sm',
  },
}

/**
 * Represents an item that can be selected in the AvatarPicker
 */
export interface AvatarItem {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Optional secondary text (e.g., email) */
  description?: string
  /** Optional avatar URL */
  avatar?: string
  /** Whether this item is disabled */
  disabled?: boolean
}

export interface AvatarPickerProps {
  /** List of items to choose from */
  items: AvatarItem[]
  /** Enable multiple selection with checkboxes */
  multiple?: boolean
  /** Selected item ID(s) - single ID for single mode, array for multiple */
  value?: string | string[]
  /** Callback when selection changes */
  onValueChange?: (value: string | string[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Search placeholder */
  searchPlaceholder?: string
  /** Size of the picker */
  size?: Size
  /** Highlight color for dropdown items */
  highlightColor?: Color
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Show search input */
  searchable?: boolean
  /** Maximum height of dropdown */
  maxHeight?: number
  /** Custom render function for items */
  renderItem?: (item: AvatarItem, isSelected: boolean, isHighlighted: boolean) => React.ReactNode
  /** Text when no items match search */
  noResultsText?: string
  /** Additional class names */
  className?: string
}

/**
 * A dropdown picker for selecting items with avatars.
 * Supports single selection or multiple selection with checkboxes.
 */
export const AvatarPicker = React.forwardRef<HTMLButtonElement, AvatarPickerProps>(
  (
    {
      items,
      multiple = false,
      value,
      onValueChange,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      size: sizeProp,
      highlightColor = 'default',
      disabled = false,
      searchable = true,
      maxHeight = 300,
      renderItem,
      noResultsText = 'No results found',
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)

    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement)

    // Get size from context or prop
    const fieldGroup = useFieldGroup()
    const size = sizeProp ?? fieldGroup.size
    const styles = sizeStyles[size]

    // Normalize value to array for internal handling
    const selectedIds = React.useMemo(() => {
      if (!value) return []
      return Array.isArray(value) ? value : [value]
    }, [value])

    // Filter items based on search
    const filteredItems = React.useMemo(() => {
      if (!searchTerm) return items
      const lower = searchTerm.toLowerCase()
      return items.filter(
        item => item.name.toLowerCase().includes(lower) || item.description?.toLowerCase().includes(lower),
      )
    }, [items, searchTerm])

    // Clamp highlightedIndex when filtered list shrinks
    React.useEffect(() => {
      if (highlightedIndex >= filteredItems.length && filteredItems.length > 0) {
        setHighlightedIndex(0)
      }
    }, [filteredItems.length, highlightedIndex])

    // Get selected items for display
    const selectedItems = React.useMemo(() => {
      return items.filter(item => selectedIds.includes(item.id))
    }, [items, selectedIds])

    // Handle selection
    const handleSelect = React.useCallback(
      (item: AvatarItem) => {
        if (item.disabled) return

        if (multiple) {
          const newValue = selectedIds.includes(item.id)
            ? selectedIds.filter(id => id !== item.id)
            : [...selectedIds, item.id]
          onValueChange?.(newValue)
        } else {
          onValueChange?.(item.id)
          setIsOpen(false)
        }
      },
      [multiple, selectedIds, onValueChange],
    )

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            setIsOpen(true)
          }
          return
        }

        // Guard against empty list to prevent NaN from modulo
        if (filteredItems.length === 0) {
          if (e.key === 'Escape') {
            e.preventDefault()
            setIsOpen(false)
          }
          return
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setHighlightedIndex(i => (i + 1) % filteredItems.length)
            break
          case 'ArrowUp':
            e.preventDefault()
            setHighlightedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length)
            break
          case 'Enter':
            e.preventDefault()
            handleSelect(filteredItems[highlightedIndex])
            break
          case 'Escape':
            e.preventDefault()
            setIsOpen(false)
            break
        }
      },
      [isOpen, filteredItems, highlightedIndex, handleSelect],
    )

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
      if (!isOpen) {
        setSearchTerm('')
        setHighlightedIndex(0)
      }
    }, [isOpen, searchable])

    // Clear all selections (for multiple mode)
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onValueChange?.(multiple ? [] : '')
    }

    // Default avatar renderer
    const renderAvatar = (item: AvatarItem) => {
      if (item.avatar) {
        return <img src={item.avatar} alt={item.name} className={cn('rounded-full object-cover', styles.avatar)} />
      }
      return (
        <div
          className={cn(
            'rounded-full bg-primary/20 flex items-center justify-center font-medium text-primary',
            styles.avatar,
          )}
        >
          {item.name.charAt(0).toUpperCase()}
        </div>
      )
    }

    // Default item renderer
    const defaultRenderItem = (item: AvatarItem, isSelected: boolean, isHighlighted: boolean) => (
      <div
        className={cn(
          'flex items-center cursor-pointer transition-colors duration-150',
          styles.item,
          isHighlighted && highlightColorStyles[highlightColor],
          item.disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        {multiple && (
          <Checkbox checked={isSelected} disabled={item.disabled} className="pointer-events-none" size={size} />
        )}
        {renderAvatar(item)}
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">{item.name}</div>
          {item.description && <div className="truncate text-muted-foreground text-xs">{item.description}</div>}
        </div>
        {!multiple && isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
      </div>
    )

    // Display text for trigger
    const displayText = React.useMemo(() => {
      if (selectedItems.length === 0) return placeholder
      if (multiple) {
        if (selectedItems.length === 1) return selectedItems[0].name
        return `${selectedItems.length} selected`
      }
      return selectedItems[0].name
    }, [selectedItems, multiple, placeholder])

    return (
      <div className={cn('relative', className)}>
        {/* Trigger button */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'w-full flex items-center justify-between rounded-md border border-input bg-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            styles.trigger,
          )}
        >
          <span className={cn('truncate', selectedItems.length === 0 && 'text-muted-foreground')}>{displayText}</span>
          <div className="flex items-center gap-1">
            {selectedItems.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded hover:bg-muted"
                aria-label="Clear selection"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            role="listbox"
            aria-multiselectable={multiple}
            className={cn(
              'absolute z-50 w-full mt-1',
              'rounded-md border bg-popover text-popover-foreground shadow-lg',
              'animate-in fade-in-0 zoom-in-95',
              styles.dropdown,
            )}
          >
            {/* Search input */}
            {searchable && (
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    className={cn(
                      'w-full pl-8 pr-3 py-1.5 rounded-md border border-input bg-background',
                      'focus:outline-none focus:ring-1 focus:ring-ring',
                      'placeholder:text-muted-foreground',
                    )}
                  />
                </div>
              </div>
            )}

            {/* Item list */}
            <div className="overflow-y-auto" style={{ maxHeight }}>
              {filteredItems.length > 0 ? (
                <div className="py-1">
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={selectedIds.includes(item.id)}
                      aria-disabled={item.disabled}
                      tabIndex={-1}
                      onClick={() => handleSelect(item)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleSelect(item)
                        }
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {renderItem
                        ? renderItem(item, selectedIds.includes(item.id), index === highlightedIndex)
                        : defaultRenderItem(item, selectedIds.includes(item.id), index === highlightedIndex)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-6 text-center text-muted-foreground">{noResultsText}</div>
              )}
            </div>

            {/* Footer for multiple selection */}
            {multiple && selectedItems.length > 0 && (
              <div className="p-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                <span>{selectedItems.length} selected</span>
                <button type="button" onClick={handleClear} className="text-primary hover:underline">
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
)

AvatarPicker.displayName = 'AvatarPicker'
