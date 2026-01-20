"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";
import { Popover } from "@/elements/Popover";
import { Calendar } from "./Calendar";
import { useFieldGroup } from "./FieldGroupContext";
import type { Size, Variant, Color } from "@/elements/tokens";

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
  /** Accent color of the trigger button */
  color?: Color;
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
}

/**
 * DatePicker component combining Calendar with Popover.
 *
 * @example
 * ```tsx
 * import { DatePicker } from "@/form";
 *
 * const [date, setDate] = React.useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Select a date"
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
      color,
      className,
      minDate,
      maxDate,
      disabledDates,
      id,
      name,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
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
            initialFocus
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
);

DatePicker.displayName = "DatePicker";
