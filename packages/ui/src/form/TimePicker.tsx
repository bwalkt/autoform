"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";
import { Popover } from "@/elements/Popover";
import { useFieldGroup } from "./FieldGroupContext";
import type { Size, Variant, Color } from "@/elements/tokens";

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

export interface TimePickerProps {
  /** Selected time value */
  value?: TimeValue;
  /** Callback when time changes */
  onChange?: (time: TimeValue | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Size of the trigger button */
  size?: Size;
  /** Visual variant of the trigger button */
  variant?: Variant;
  /** Accent color of the trigger button */
  color?: Color;
  /** Whether to show seconds */
  showSeconds?: boolean;
  /** Use 12-hour format */
  use12HourFormat?: boolean;
  /** Minimum time (HH:MM format) */
  minTime?: string;
  /** Maximum time (HH:MM format) */
  maxTime?: string;
  /** Step in minutes for the picker */
  minuteStep?: number;
  /** Additional class names */
  className?: string;
  /** ID for form association */
  id?: string;
  /** Name for form submission */
  name?: string;
}

/**
 * TimePicker component for selecting time with a custom popover UI.
 *
 * @example
 * ```tsx
 * import { TimePicker, type TimeValue } from "@/form";
 *
 * const [time, setTime] = React.useState<TimeValue>({ hours: 9, minutes: 0 });
 *
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   placeholder="Select time"
 * />
 * ```
 */
export const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Select time",
      disabled = false,
      size: sizeProp,
      variant = "outline",
      color,
      showSeconds = false,
      use12HourFormat = false,
      minTime: _minTime,
      maxTime: _maxTime,
      minuteStep = 1,
      className,
      id,
      name,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const fieldGroup = useFieldGroup();
    const size = sizeProp ?? fieldGroup.size;

    // Local state for time selection
    const [hours, setHours] = React.useState(value?.hours ?? 12);
    const [minutes, setMinutes] = React.useState(value?.minutes ?? 0);
    const [seconds, setSeconds] = React.useState(value?.seconds ?? 0);
    const [period, setPeriod] = React.useState<"AM" | "PM">(
      value?.hours !== undefined && value.hours >= 12 ? "PM" : "AM"
    );

    // Update local state when value changes externally
    React.useEffect(() => {
      if (value) {
        setHours(value.hours);
        setMinutes(value.minutes);
        setSeconds(value.seconds ?? 0);
        setPeriod(value.hours >= 12 ? "PM" : "AM");
      }
    }, [value]);

    // Note: minTime/maxTime constraints can be implemented for option filtering in future
    // Currently accepted but not enforced in the UI

    const handleTimeChange = (type: "hours" | "minutes" | "seconds" | "period", val: number | string) => {
      let newHours = hours;
      let newMinutes = minutes;
      let newSeconds = seconds;
      let newPeriod = period;

      if (type === "hours") {
        newHours = val as number;
        setHours(newHours);
      } else if (type === "minutes") {
        newMinutes = val as number;
        setMinutes(newMinutes);
      } else if (type === "seconds") {
        newSeconds = val as number;
        setSeconds(newSeconds);
      } else if (type === "period") {
        newPeriod = val as "AM" | "PM";
        setPeriod(newPeriod);
        // Convert hours when period changes
        if (use12HourFormat) {
          if (newPeriod === "PM" && newHours < 12) {
            newHours = newHours + 12;
          } else if (newPeriod === "AM" && newHours >= 12) {
            newHours = newHours - 12;
          }
          setHours(newHours);
        }
      }

      // For 12-hour format, convert display hours to 24-hour
      let finalHours = newHours;
      if (use12HourFormat && type !== "period") {
        if (newPeriod === "PM" && newHours < 12) {
          finalHours = newHours + 12;
        } else if (newPeriod === "AM" && newHours === 12) {
          finalHours = 0;
        }
      }

      const newValue: TimeValue = {
        hours: finalHours,
        minutes: newMinutes,
        ...(showSeconds && { seconds: newSeconds }),
      };

      onChange?.(newValue);
    };

    // Format time for display
    const formatTimeDisplay = (): string => {
      if (!value) return "";

      let displayHours = value.hours;
      let suffix = "";

      if (use12HourFormat) {
        suffix = value.hours >= 12 ? " PM" : " AM";
        displayHours = value.hours % 12 || 12;
      }

      const h = String(displayHours).padStart(2, "0");
      const m = String(value.minutes).padStart(2, "0");

      if (showSeconds && value.seconds !== undefined) {
        const s = String(value.seconds).padStart(2, "0");
        return `${h}:${m}:${s}${suffix}`;
      }

      return `${h}:${m}${suffix}`;
    };

    // Generate options
    const hourOptions = use12HourFormat
      ? Array.from({ length: 12 }, (_, i) => i + 1) // 1-12
      : Array.from({ length: 24 }, (_, i) => i); // 0-23

    const minuteOptions = Array.from(
      { length: Math.ceil(60 / minuteStep) },
      (_, i) => i * minuteStep
    );

    const secondOptions = Array.from({ length: 60 }, (_, i) => i);

    // Get display hour for 12-hour format
    const getDisplayHour = (): number => {
      if (!use12HourFormat) return hours;
      const h = hours % 12;
      return h === 0 ? 12 : h;
    };

    // Format hidden input value as ISO time string
    const getHiddenValue = (): string => {
      if (!value) return "";
      const h = String(value.hours).padStart(2, "0");
      const m = String(value.minutes).padStart(2, "0");
      if (showSeconds && value.seconds !== undefined) {
        const s = String(value.seconds).padStart(2, "0");
        return `${h}:${m}:${s}`;
      }
      return `${h}:${m}`;
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        {name && (
          <input
            type="hidden"
            name={name}
            value={getHiddenValue()}
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
            <Clock className="mr-2 h-4 w-4" />
            {value ? formatTimeDisplay() : <span>{placeholder}</span>}
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-auto p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <select
                value={use12HourFormat ? getDisplayHour() : hours}
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
              {use12HourFormat && (
                <select
                  value={period}
                  onChange={(e) => handleTimeChange("period", e.target.value)}
                  className={cn(
                    "h-8 w-16 rounded-md border border-input bg-background px-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                  )}
                  aria-label="AM/PM"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              )}
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  },
);

TimePicker.displayName = "TimePicker";
