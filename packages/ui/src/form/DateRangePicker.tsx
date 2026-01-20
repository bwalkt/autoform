"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";
import { Popover } from "@/elements/Popover";
import { Calendar } from "./Calendar";
import { useFieldGroup } from "./FieldGroupContext";
import type { Size, Variant, Color } from "@/elements/tokens";

export type { DateRange };

export interface DateRangePickerProps {
  /** Selected date range */
  value?: DateRange;
  /** Callback when date range changes */
  onChange?: (range: DateRange | undefined) => void;
  /** Placeholder text when no dates selected */
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
  /** Number of months to display */
  numberOfMonths?: number;
  /** ID for form association */
  id?: string;
  /** Name for form submission */
  name?: string;
}

/**
 * DateRangePicker component for selecting a date range.
 *
 * @example
 * ```tsx
 * import { DateRangePicker, type DateRange } from "@/form";
 *
 * const [range, setRange] = React.useState<DateRange>();
 *
 * <DateRangePicker
 *   value={range}
 *   onChange={setRange}
 *   placeholder="Select date range"
 * />
 * ```
 */
export const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date range",
      dateFormat = "LLL dd, y",
      disabled = false,
      size: sizeProp,
      variant = "outline",
      color,
      className,
      minDate,
      maxDate,
      numberOfMonths = 2,
      id,
      name,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    // Build disabled matcher for react-day-picker
    const disabledMatcher = React.useMemo(() => {
      const matchers: Array<{ before: Date } | { after: Date }> = [];

      if (minDate) {
        matchers.push({ before: minDate });
      }
      if (maxDate) {
        matchers.push({ after: maxDate });
      }

      return matchers.length > 0 ? matchers : undefined;
    }, [minDate, maxDate]);

    const formatDateRange = () => {
      if (!value?.from) {
        return <span>{placeholder}</span>;
      }

      if (value.to) {
        return (
          <>
            {format(value.from, dateFormat)} - {format(value.to, dateFormat)}
          </>
        );
      }

      return format(value.from, dateFormat);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        {name && (
          <>
            <input
              type="hidden"
              name={`${name}_from`}
              value={value?.from ? value.from.toISOString() : ""}
            />
            <input
              type="hidden"
              name={`${name}_to`}
              value={value?.to ? value.to.toISOString() : ""}
            />
          </>
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
            {formatDateRange()}
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start" maxWidth="none" className="w-auto p-0">
          <Calendar
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            disabled={disabledMatcher}
            initialFocus
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";
