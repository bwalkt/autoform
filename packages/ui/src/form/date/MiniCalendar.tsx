"use client";

import * as React from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfDay,
  isSameDay,
  isToday,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/elements/Button";

export interface MiniCalendarProps {
  /** Selected date */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Show month/year header */
  showHeader?: boolean;
  /** Compact mode - smaller buttons */
  compact?: boolean;
}

/**
 * MiniCalendar - A compact horizontal week-based date picker.
 * Perfect for dashboards, sidebars, or mobile interfaces.
 *
 * @example
 * ```tsx
 * import { MiniCalendar } from "@/form";
 *
 * const [date, setDate] = React.useState<Date>(new Date());
 *
 * <MiniCalendar
 *   value={date}
 *   onChange={setDate}
 * />
 * ```
 */
export const MiniCalendar = React.forwardRef<HTMLDivElement, MiniCalendarProps>(
  (
    {
      value,
      onChange,
      minDate,
      maxDate,
      weekStartsOn = 0,
      disabled = false,
      className,
      showHeader = true,
      compact = false,
    },
    ref,
  ) => {
    const [currentDate, setCurrentDate] = React.useState<Date>(value || new Date());

    // Update current date when value changes
    React.useEffect(() => {
      if (value) {
        setCurrentDate(value);
      }
    }, [value]);

    // Get week days based on current date
    const weekStart = startOfWeek(currentDate, { weekStartsOn });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const handlePrevWeek = () => {
      setCurrentDate(subWeeks(currentDate, 1));
    };

    const handleNextWeek = () => {
      setCurrentDate(addWeeks(currentDate, 1));
    };

    // Normalize comparisons to day granularity to avoid time-of-day issues
    const isDateDisabled = (date: Date): boolean => {
      const d = startOfDay(date);
      if (minDate && d < startOfDay(minDate)) return true;
      if (maxDate && d > startOfDay(maxDate)) return true;
      return false;
    };

    const handleDateSelect = (date: Date) => {
      if (disabled) return;
      if (isDateDisabled(date)) return;
      onChange?.(date);
    };

    const handleToday = () => {
      const today = new Date();
      setCurrentDate(today);
      if (!isDateDisabled(today)) {
        onChange?.(today);
      }
    };

    const buttonSize = compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
    const navButtonSize = compact ? "h-6 w-6" : "h-8 w-8";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 p-3 rounded-lg border bg-background",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        {/* Header with navigation */}
        {showHeader && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="1"
              onClick={handlePrevWeek}
              disabled={disabled}
              className={cn("p-0", navButtonSize)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous week</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
                {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
              </span>
              <Button
                variant="outline"
                size="1"
                onClick={handleToday}
                disabled={disabled}
                className={cn("text-xs px-2", compact ? "h-5" : "h-6")}
              >
                Today
              </Button>
            </div>

            <Button
              variant="ghost"
              size="1"
              onClick={handleNextWeek}
              disabled={disabled}
              className={cn("p-0", navButtonSize)}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next week</span>
            </Button>
          </div>
        )}

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={`label-${day.toISOString()}`}
              className={cn(
                "text-center text-muted-foreground font-medium",
                compact ? "text-[10px]" : "text-xs",
              )}
            >
              {format(day, "EEE")}
            </div>
          ))}
        </div>

        {/* Day buttons */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const isSelected = value && isSameDay(day, value);
            const isTodayDate = isToday(day);
            const isDisabled = isDateDisabled(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDateSelect(day)}
                disabled={disabled || isDisabled}
                aria-pressed={isSelected}
                aria-current={isTodayDate ? "date" : undefined}
                aria-label={format(day, "EEEE, MMMM d, yyyy")}
                className={cn(
                  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50",
                  buttonSize,
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : isTodayDate
                      ? "bg-accent text-accent-foreground hover:bg-accent/80"
                      : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

MiniCalendar.displayName = "MiniCalendar";
