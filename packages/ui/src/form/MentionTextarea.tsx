'use client'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import type { Color } from '@/elements/tokens'
import { cn } from '@/lib/utils'
import { Textarea, type TextareaProps } from './Textarea'
import { highlightColorStyles } from './textFieldStyles'

/**
 * Represents a mentionable item
 */
export interface MentionItem {
  /** Unique identifier */
  id: string
  /** Display label shown in the dropdown */
  label: string
  /** Optional value to insert (defaults to label) */
  value?: string
  /** Optional icon or avatar */
  icon?: React.ReactNode
  /** Whether this item is disabled */
  disabled?: boolean
}

/**
 * Configuration for a single trigger
 */
export interface TriggerConfig {
  /** The trigger character (e.g., "@", "#") */
  trigger: string
  /** List of mentionable items for this trigger */
  items: MentionItem[]
  /** Highlight color for this trigger's dropdown */
  highlightColor?: Color
}

export interface MentionTextareaProps extends Omit<TextareaProps, 'onChange'> {
  /** List of mentionable items (used with single trigger) */
  mentions?: MentionItem[]
  /** Trigger character (default: "@") - used with mentions prop */
  trigger?: string
  /** Multiple triggers configuration - overrides mentions/trigger props */
  triggers?: TriggerConfig[]
  /** Controlled value */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Callback when a mention is selected */
  onMentionSelect?: (item: MentionItem, trigger: string) => void
  /** Custom render function for mention items */
  renderItem?: (item: MentionItem, isHighlighted: boolean, trigger: string) => React.ReactNode
  /** Maximum items to show in dropdown */
  maxItems?: number
  /** Placeholder when no matches */
  noMatchesText?: string
  /** Highlight color for dropdown items (default trigger) */
  highlightColor?: Color
}

/**
 * Textarea with @mention support.
 * Shows a dropdown when the trigger character is typed, allowing users to mention items.
 */
export const MentionTextarea = React.forwardRef<HTMLTextAreaElement, MentionTextareaProps>(
  (
    {
      mentions,
      trigger = '@',
      triggers: triggersProp,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onMentionSelect,
      renderItem,
      maxItems = 5,
      noMatchesText = 'No matches found',
      highlightColor = 'default',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(() => (defaultValue == null ? '' : String(defaultValue)))
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [activeTrigger, setActiveTrigger] = React.useState<string | null>(null)

    // Normalize triggers - either from triggers prop or single trigger/mentions
    const triggers = React.useMemo<TriggerConfig[]>(() => {
      if (triggersProp && triggersProp.length > 0) {
        return triggersProp
      }
      if (mentions) {
        return [{ trigger, items: mentions, highlightColor }]
      }
      return []
    }, [triggersProp, mentions, trigger, highlightColor])
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const [triggerPosition, setTriggerPosition] = React.useState<{
      top: number
      left: number
      showAbove?: boolean
    } | null>(null)

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const mirrorRef = React.useRef<HTMLDivElement>(null)

    // Generate stable IDs for ARIA
    const listboxId = React.useId()
    const getOptionId = (index: number) => `${listboxId}-option-${index}`

    // Controlled/uncontrolled value handling
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    // Get active trigger config
    const activeTriggerConfig = React.useMemo(() => {
      return triggers.find(t => t.trigger === activeTrigger)
    }, [triggers, activeTrigger])

    // Filter mentions based on search term and active trigger
    const filteredMentions = React.useMemo(() => {
      if (!activeTriggerConfig) return []
      const items = activeTriggerConfig.items
      if (!searchTerm) return items.slice(0, maxItems)
      const lower = searchTerm.toLowerCase()
      return items.filter(m => m.label.toLowerCase().includes(lower)).slice(0, maxItems)
    }, [activeTriggerConfig, searchTerm, maxItems])

    // Clamp highlightedIndex when filtered list shrinks
    React.useEffect(() => {
      if (highlightedIndex >= filteredMentions.length && filteredMentions.length > 0) {
        setHighlightedIndex(0)
      }
    }, [filteredMentions.length, highlightedIndex])

    // Get all trigger characters for detection
    const triggerChars = React.useMemo(() => triggers.map(t => t.trigger), [triggers])

    // Calculate cursor position in textarea (viewport coordinates for portal)
    const calculateCursorPosition = React.useCallback(() => {
      const textarea = textareaRef.current
      const mirror = mirrorRef.current
      if (!textarea || !mirror) return null

      const cursorPos = textarea.selectionStart
      // Use textarea.value directly to avoid stale state during rapid typing
      const textBeforeCursor = textarea.value.slice(0, cursorPos)

      // Copy textarea styles to mirror
      const styles = window.getComputedStyle(textarea)
      mirror.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
        width: ${styles.width};
        font-family: ${styles.fontFamily};
        font-size: ${styles.fontSize};
        font-weight: ${styles.fontWeight};
        line-height: ${styles.lineHeight};
        padding: ${styles.padding};
        border: ${styles.border};
        box-sizing: ${styles.boxSizing};
      `

      // Create a span at cursor position
      mirror.innerHTML = ''
      const textNode = document.createTextNode(textBeforeCursor)
      const span = document.createElement('span')
      span.textContent = '\u200B' // Zero-width space
      mirror.appendChild(textNode)
      mirror.appendChild(span)

      const spanRect = span.getBoundingClientRect()

      // getBoundingClientRect() already returns viewport coordinates
      // No scroll offset adjustment needed for fixed positioning
      const spanTop = spanRect.top
      const spanBottom = spanRect.bottom
      const spanLeft = spanRect.left

      // Calculate position - check if dropdown should appear above or below
      const spaceBelow = window.innerHeight - spanBottom
      const dropdownHeight = 200 // Approximate max dropdown height
      const showAbove = spaceBelow < dropdownHeight && spanTop > dropdownHeight

      return {
        top: showAbove ? spanTop - dropdownHeight : spanBottom + 4,
        left: Math.max(8, Math.min(spanLeft, window.innerWidth - 320)), // Keep within viewport
        showAbove,
      }
    }, [])

    // Handle input change
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        const cursorPos = e.target.selectionStart

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)

        // Check for any trigger
        const textBeforeCursor = newValue.slice(0, cursorPos)

        // Find the most recent valid trigger
        let foundTrigger: string | null = null
        let lastTriggerIndex = -1

        for (const triggerChar of triggerChars) {
          const idx = textBeforeCursor.lastIndexOf(triggerChar)
          if (idx > lastTriggerIndex) {
            // Check if trigger is at start or preceded by whitespace
            const charBefore = textBeforeCursor[idx - 1]
            const isValidTrigger = idx === 0 || (charBefore ? /\s/.test(charBefore) : true)

            if (isValidTrigger) {
              const textAfterTrigger = textBeforeCursor.slice(idx + triggerChar.length)
              // No spaces in mention search
              if (!/\s/.test(textAfterTrigger)) {
                foundTrigger = triggerChar
                lastTriggerIndex = idx
              }
            }
          }
        }

        if (foundTrigger && lastTriggerIndex !== -1) {
          const textAfterTrigger = textBeforeCursor.slice(lastTriggerIndex + foundTrigger.length)
          setSearchTerm(textAfterTrigger)
          setActiveTrigger(foundTrigger)
          setIsOpen(true)
          setHighlightedIndex(0)

          // Calculate position after state update
          requestAnimationFrame(() => {
            const pos = calculateCursorPosition()
            if (pos) setTriggerPosition(pos)
          })
          return
        }

        setIsOpen(false)
        setSearchTerm('')
        setActiveTrigger(null)
      },
      [triggerChars, isControlled, onValueChange, calculateCursorPosition],
    )

    // Select a mention (defined before handleKeyDown to avoid dependency issues)
    const selectMention = React.useCallback(
      (item: MentionItem) => {
        if (item.disabled || !activeTrigger) return

        const textarea = textareaRef.current
        if (!textarea) return

        const cursorPos = textarea.selectionStart
        const textBeforeCursor = value.slice(0, cursorPos)
        const lastTriggerIndex = textBeforeCursor.lastIndexOf(activeTrigger)

        // Guard against missing trigger (cursor moved away)
        if (lastTriggerIndex === -1) {
          setIsOpen(false)
          setSearchTerm('')
          setActiveTrigger(null)
          return
        }

        const mentionValue = item.value ?? item.label
        const newValue = `${value.slice(0, lastTriggerIndex)}${activeTrigger}${mentionValue} ${value.slice(cursorPos)}`

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
        onMentionSelect?.(item, activeTrigger)

        setIsOpen(false)
        setSearchTerm('')
        setActiveTrigger(null)

        // Move cursor after the mention
        const newCursorPos = lastTriggerIndex + activeTrigger.length + mentionValue.length + 1
        requestAnimationFrame(() => {
          textarea.focus()
          textarea.setSelectionRange(newCursorPos, newCursorPos)
        })
      },
      [value, activeTrigger, isControlled, onValueChange, onMentionSelect],
    )

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!isOpen) return

        switch (e.key) {
          case 'ArrowDown':
            if (filteredMentions.length === 0) return
            e.preventDefault()
            setHighlightedIndex(i => (i + 1) % filteredMentions.length)
            break
          case 'ArrowUp':
            if (filteredMentions.length === 0) return
            e.preventDefault()
            setHighlightedIndex(i => (i - 1 + filteredMentions.length) % filteredMentions.length)
            break
          case 'Enter':
          case 'Tab':
            if (filteredMentions.length > 0) {
              e.preventDefault()
              const selected = filteredMentions[highlightedIndex]
              if (selected) {
                selectMention(selected)
              }
            }
            break
          case 'Escape':
            e.preventDefault()
            setIsOpen(false)
            break
        }
      },
      [isOpen, filteredMentions, highlightedIndex, selectMention],
    )

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          textareaRef.current &&
          !textareaRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Get the effective highlight color for active trigger
    const effectiveHighlightColor = activeTriggerConfig?.highlightColor ?? highlightColor

    // Default item renderer
    const defaultRenderItem = (item: MentionItem, isHighlighted: boolean) => (
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 cursor-pointer',
          'transition-colors duration-150',
          isHighlighted && highlightColorStyles[effectiveHighlightColor],
          item.disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span className="truncate">{item.label}</span>
      </div>
    )

    return (
      <div className="relative">
        {/* Hidden mirror div for cursor position calculation */}
        <div ref={mirrorRef} aria-hidden="true" />

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={className}
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={isOpen && filteredMentions.length > 0 ? getOptionId(highlightedIndex) : undefined}
          aria-autocomplete="list"
          {...props}
        />

        {/* Mention dropdown - rendered via portal to avoid clipping */}
        {isOpen &&
          triggerPosition &&
          ReactDOM.createPortal(
            <div
              ref={dropdownRef}
              id={listboxId}
              role="listbox"
              aria-label="Mention suggestions"
              className={cn(
                'fixed z-[9999] min-w-[200px] max-w-[300px]',
                'rounded-md border bg-popover text-popover-foreground shadow-lg',
                'animate-in fade-in-0 zoom-in-95',
                triggerPosition.showAbove && 'animate-in slide-in-from-bottom-2',
                !triggerPosition.showAbove && 'animate-in slide-in-from-top-2',
              )}
              style={{
                top: triggerPosition.top,
                left: triggerPosition.left,
              }}
            >
              {filteredMentions.length > 0 ? (
                <div className="py-1">
                  {filteredMentions.map((item, index) => (
                    <div
                      key={item.id}
                      id={getOptionId(index)}
                      role="option"
                      aria-selected={index === highlightedIndex}
                      aria-disabled={item.disabled}
                      tabIndex={-1}
                      onClick={() => selectMention(item)}
                      // onKeyDown kept for a11y linter rule, though keyboard nav is handled by textarea
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          selectMention(item)
                        }
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {renderItem
                        ? renderItem(item, index === highlightedIndex, activeTrigger || '')
                        : defaultRenderItem(item, index === highlightedIndex)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">{noMatchesText}</div>
              )}
            </div>,
            document.body,
          )}
      </div>
    )
  },
)

MentionTextarea.displayName = 'MentionTextarea'
