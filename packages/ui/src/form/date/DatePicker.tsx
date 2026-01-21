"use client";

import * as React from "react";
import { format } from "date-fns";
import { parseDate } from "chrono-node";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";
import { Popover } from "@/elements/Popover";
import { Calendar, type CalendarSelectionVariant } from "./Calendar";
import { TextField } from "../TextField";
import { useFieldGroup } from "../FieldGroupContext";
import type { Size, Variant, Color, Radius, TextFieldVariant } from "@/elements/tokens";

/** Map button variant to calendar selection variant */
const getCalendarVariant = (variant: Variant): CalendarSelectionVariant => {
  switch (variant) {
    case "soft":
      return "soft";
    case "outline":
    case "ghost":
      return "outline";
    default:
      return "solid";
  }
};

export interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Date format string (date-fns format) */
  dateFormat?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Size of the trigger button */
  size?: Size;
  /** Visual variant of the trigger button */
  variant?: Variant;
  /** TextField variant (for natural language mode) */
  textFieldVariant?: TextFieldVariant;
  /** Accent color of the trigger button */
  color?: Color;
  /** Border radius (for natural language mode) */
  radius?: Radius;
  /** Additional class names for the trigger */
  className?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Dates that should be disabled */
  disabledDates?: Date[];
  /** ID for form association */
  id?: string;
  /** Name for form submission */
  name?: string;
  /** Enable natural language input (e.g., "tomorrow", "next week") */
  enableNaturalLanguage?: boolean;
}

/**
 * DatePicker component combining Calendar with Popover.
 * Supports natural language input when enableNaturalLanguage is true.
 *
 * @example
 * ```tsx
 * import { DatePicker } from "@/form";
 *
 * const [date, setDate] = React.useState<Date>();
 *
 * // Standard picker
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select a date"
 * />
 *
 * // With natural language input
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   enableNaturalLanguage
 *   placeholder="Tomorrow or next week"
 * />
 * ```
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      dateFormat = "PPP",
      disabled = false,
      size: sizeProp,
      variant = "outline",
      textFieldVariant = "outline",
      color,
      radius = "md",
      className,
      minDate,
      maxDate,
      disabledDates,
      id,
      name,
      enableNaturalLanguage = false,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [month, setMonth] = React.useState<Date | undefined>(value);
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    // Sync input value with date value
    React.useEffect(() => {
      if (value && !open) {
        setInputValue(format(value, dateFormat));
      }
    }, [value, dateFormat, open]);

    // Update month when value changes
    React.useEffect(() => {
      if (value) {
        setMonth(value);
      }
    }, [value]);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      if (date) {
        setInputValue(format(date, dateFormat));
      }
      setOpen(false);
    };

    // Check if a date is allowed based on constraints
    const isDateAllowed = React.useCallback(
      (date: Date) => {
        if (minDate && date < minDate) return false;
        if (maxDate && date > maxDate) return false;
        if (disabledDates?.some((d) => d.toDateString() === date.toDateString())) return false;
        return true;
      },
      [minDate, maxDate, disabledDates],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Try to parse natural language
      const parsed = parseDate(newValue);
      if (parsed && isDateAllowed(parsed)) {
        onChange?.(parsed);
        setMonth(parsed);
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
    };

    // Build disabled matcher for react-day-picker
    const disabledMatcher = React.useMemo(() => {
      const matchers: Array<Date | { before: Date } | { after: Date }> = [];

      if (minDate) {
        matchers.push({ before: minDate });
      }
      if (maxDate) {
        matchers.push({ after: maxDate });
      }
      if (disabledDates) {
        matchers.push(...disabledDates);
      }

      return matchers.length > 0 ? matchers : undefined;
    }, [minDate, maxDate, disabledDates]);

    // Natural language input mode
    if (enableNaturalLanguage) {
      return (
        <Popover.Root open={open} onOpenChange={setOpen}>
          {name && (
            <input
              type="hidden"
              name={name}
              value={value ? value.toISOString() : ""}
            />
          )}
          <div className={cn("relative w-full", className)}>
            <TextField
              id={id}
              value={inputValue}
              placeholder={placeholder}
              disabled={disabled}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              size={size}
              variant={textFieldVariant}
              color={color}
              radius={radius}
              rightIcon={
                <button
                  ref={ref as React.Ref<HTMLButtonElement>}
                  type="button"
                  disabled={disabled}
                  onClick={() => setOpen(true)}
                  className="pointer-events-auto cursor-pointer hover:text-foreground disabled:cursor-not-allowed"
                  aria-label="Pick a date"
                >
                  <CalendarIcon className="h-4 w-4" />
                </button>
              }
            />
          </div>
          <Popover.Content align="end" sideOffset={10} className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              disabled={disabledMatcher}
              selectionVariant={getCalendarVariant(variant)}
              color={color}
              autoFocus
            />
          </Popover.Content>
        </Popover.Root>
      );
    }

    // Standard button mode
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        {name && (
          <input
            type="hidden"
            name={name}
            value={value ? value.toISOString() : ""}
          />
        )}
        <Popover.Trigger>
          <Button
            ref={ref}
            id={id}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabledMatcher}
            selectionVariant={getCalendarVariant(variant)}
            color={color}
            autoFocus
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
);

DatePicker.displayName = "DatePicker";
