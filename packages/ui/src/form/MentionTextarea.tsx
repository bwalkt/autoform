'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Textarea, type TextareaProps } from './Textarea'

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

export interface MentionTextareaProps extends Omit<TextareaProps, 'onChange'> {
  /** List of mentionable items */
  mentions: MentionItem[]
  /** Trigger character (default: "@") */
  trigger?: string
  /** Controlled value */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Callback when a mention is selected */
  onMentionSelect?: (item: MentionItem) => void
  /** Custom render function for mention items */
  renderItem?: (item: MentionItem, isHighlighted: boolean) => React.ReactNode
  /** Maximum items to show in dropdown */
  maxItems?: number
  /** Placeholder when no matches */
  noMatchesText?: string
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
      value: controlledValue,
      onValueChange,
      onMentionSelect,
      renderItem,
      maxItems = 5,
      noMatchesText = 'No matches found',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [highlightedIndex, setHighlightedIndex] = React.useState(0)
    const [triggerPosition, setTriggerPosition] = React.useState<{ top: number; left: number } | null>(null)

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const mirrorRef = React.useRef<HTMLDivElement>(null)

    // Controlled/uncontrolled value handling
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    // Filter mentions based on search term
    const filteredMentions = React.useMemo(() => {
      if (!searchTerm) return mentions.slice(0, maxItems)
      const lower = searchTerm.toLowerCase()
      return mentions.filter(m => m.label.toLowerCase().includes(lower)).slice(0, maxItems)
    }, [mentions, searchTerm, maxItems])

    // Calculate cursor position in textarea
    const calculateCursorPosition = React.useCallback(() => {
      const textarea = textareaRef.current
      const mirror = mirrorRef.current
      if (!textarea || !mirror) return null

      const cursorPos = textarea.selectionStart
      const textBeforeCursor = value.slice(0, cursorPos)

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
      const textareaRect = textarea.getBoundingClientRect()

      return {
        top: spanRect.top - textareaRect.top + textarea.scrollTop + 20,
        left: spanRect.left - textareaRect.left,
      }
    }, [value])

    // Handle input change
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        const cursorPos = e.target.selectionStart

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)

        // Check for trigger
        const textBeforeCursor = newValue.slice(0, cursorPos)
        const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger)

        if (lastTriggerIndex !== -1) {
          // Check if trigger is at start or preceded by whitespace
          const charBefore = textBeforeCursor[lastTriggerIndex - 1]
          const isValidTrigger = lastTriggerIndex === 0 || /\s/.test(charBefore)

          if (isValidTrigger) {
            const textAfterTrigger = textBeforeCursor.slice(lastTriggerIndex + 1)
            // No spaces in mention search
            if (!/\s/.test(textAfterTrigger)) {
              setSearchTerm(textAfterTrigger)
              setIsOpen(true)
              setHighlightedIndex(0)

              // Calculate position after state update
              requestAnimationFrame(() => {
                const pos = calculateCursorPosition()
                if (pos) setTriggerPosition(pos)
              })
              return
            }
          }
        }

        setIsOpen(false)
        setSearchTerm('')
      },
      [trigger, isControlled, onValueChange, calculateCursorPosition],
    )

    // Select a mention (defined before handleKeyDown to avoid dependency issues)
    const selectMention = React.useCallback(
      (item: MentionItem) => {
        if (item.disabled) return

        const textarea = textareaRef.current
        if (!textarea) return

        const cursorPos = textarea.selectionStart
        const textBeforeCursor = value.slice(0, cursorPos)
        const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger)

        const mentionValue = item.value ?? item.label
        const newValue = `${value.slice(0, lastTriggerIndex)}${trigger}${mentionValue} ${value.slice(cursorPos)}`

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
        onMentionSelect?.(item)

        setIsOpen(false)
        setSearchTerm('')

        // Move cursor after the mention
        const newCursorPos = lastTriggerIndex + trigger.length + mentionValue.length + 1
        requestAnimationFrame(() => {
          textarea.focus()
          textarea.setSelectionRange(newCursorPos, newCursorPos)
        })
      },
      [value, trigger, isControlled, onValueChange, onMentionSelect],
    )

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!isOpen) return

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setHighlightedIndex(i => (i + 1) % filteredMentions.length)
            break
          case 'ArrowUp':
            e.preventDefault()
            setHighlightedIndex(i => (i - 1 + filteredMentions.length) % filteredMentions.length)
            break
          case 'Enter':
          case 'Tab':
            if (filteredMentions.length > 0) {
              e.preventDefault()
              selectMention(filteredMentions[highlightedIndex])
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

    // Default item renderer
    const defaultRenderItem = (item: MentionItem, isHighlighted: boolean) => (
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 cursor-pointer',
          'transition-colors duration-150',
          isHighlighted && 'bg-accent',
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
          {...props}
        />

        {/* Mention dropdown */}
        {isOpen && triggerPosition && (
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Mention suggestions"
            className={cn(
              'absolute z-50 min-w-[200px] max-w-[300px]',
              'rounded-md border bg-popover text-popover-foreground shadow-lg',
              'animate-in fade-in-0 zoom-in-95',
            )}
            style={{
              top: triggerPosition.top,
              left: Math.min(triggerPosition.left, 200), // Prevent overflow
            }}
          >
            {filteredMentions.length > 0 ? (
              <div className="py-1">
                {filteredMentions.map((item, index) => (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    aria-disabled={item.disabled}
                    tabIndex={-1}
                    onClick={() => selectMention(item)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        selectMention(item)
                      }
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {renderItem
                      ? renderItem(item, index === highlightedIndex)
                      : defaultRenderItem(item, index === highlightedIndex)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">{noMatchesText}</div>
            )}
          </div>
        )}
      </div>
    )
  },
)

MentionTextarea.displayName = 'MentionTextarea'
