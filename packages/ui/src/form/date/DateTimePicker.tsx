"use client";

import * as React from "react";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";
import { Popover } from "@/elements/Popover";
import { Calendar } from "./Calendar";
import { useFieldGroup } from "../FieldGroupContext";
import type { Size, Variant, Color } from "@/elements/tokens";

export interface DateTimePickerProps {
  /** Selected date and time */
  value?: Date;
  /** Callback when date/time changes */
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
  /** Whether to show seconds in time picker */
  showSeconds?: boolean;
  /** Minute step for time picker */
  minuteStep?: number;
  /** ID for form association */
  id?: string;
  /** Name for form submission */
  name?: string;
}

/**
 * DateTimePicker component combining Calendar with time selection.
 *
 * @example
 * ```tsx
 * import { DateTimePicker } from "@/form";
 *
 * const [dateTime, setDateTime] = React.useState<Date>();
 *
 * <DateTimePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 *   placeholder="Select date and time"
 * />
 * ```
 */
export const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick date and time",
      dateFormat = "PPP p",
      disabled = false,
      size: sizeProp,
      variant = "outline",
      color,
      className,
      minDate,
      maxDate,
      showSeconds = false,
      minuteStep = 1,
      id,
      name,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    // Local state for time when date is selected
    const [hours, setHoursState] = React.useState(value?.getHours() ?? 12);
    const [minutes, setMinutesState] = React.useState(value?.getMinutes() ?? 0);
    const [seconds, setSecondsState] = React.useState(value?.getSeconds() ?? 0);

    // Update local time state when value changes externally
    React.useEffect(() => {
      if (value) {
        setHoursState(value.getHours());
        setMinutesState(value.getMinutes());
        setSecondsState(value.getSeconds());
      }
    }, [value]);

    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        let newDate = setHours(date, hours);
        newDate = setMinutes(newDate, minutes);
        if (showSeconds) {
          newDate = setSeconds(newDate, seconds);
        }
        onChange?.(newDate);
      } else {
        onChange?.(undefined);
      }
    };

    const handleTimeChange = (type: "hours" | "minutes" | "seconds", val: number) => {
      if (type === "hours") setHoursState(val);
      if (type === "minutes") setMinutesState(val);
      if (type === "seconds") setSecondsState(val);

      if (value) {
        let newDate = new Date(value);
        if (type === "hours") newDate = setHours(newDate, val);
        if (type === "minutes") newDate = setMinutes(newDate, val);
        if (type === "seconds") newDate = setSeconds(newDate, val);
        onChange?.(newDate);
      }
    };

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

    // Generate options for selects
    const hourOptions = Array.from({ length: 24 }, (_, i) => i);
    const minuteOptions = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
    const secondOptions = Array.from({ length: 60 }, (_, i) => i);

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
          <div className="flex flex-col">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              disabled={disabledMatcher}
              initialFocus
            />
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  <select
                    value={hours}
                    onChange={(e) => handleTimeChange("hours", parseInt(e.target.value, 10))}
                    className={cn(
                      "h-8 w-14 rounded-md border border-input bg-background px-2 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    )}
                    aria-label="Hours"
                  >
                    {hourOptions.map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span className="text-muted-foreground">:</span>
                  <select
                    value={minutes}
                    onChange={(e) => handleTimeChange("minutes", parseInt(e.target.value, 10))}
                    className={cn(
                      "h-8 w-14 rounded-md border border-input bg-background px-2 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                    )}
                    aria-label="Minutes"
                  >
                    {minuteOptions.map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  {showSeconds && (
                    <>
                      <span className="text-muted-foreground">:</span>
                      <select
                        value={seconds}
                        onChange={(e) => handleTimeChange("seconds", parseInt(e.target.value, 10))}
                        className={cn(
                          "h-8 w-14 rounded-md border border-input bg-background px-2 text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                        )}
                        aria-label="Seconds"
                      >
                        {secondOptions.map((s) => (
                          <option key={s} value={s}>
                            {String(s).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";
