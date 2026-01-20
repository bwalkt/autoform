"use client";

import type * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = DayPickerProps & {
  /** Additional class names */
  className?: string;
};

/**
 * Calendar component built on react-day-picker.
 * Supports single date, multiple dates, and range selection.
 *
 * @example
 * ```tsx
 * import { Calendar } from "@/form";
 *
 * // Single date selection
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 *
 * // Date range selection
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 * ```
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        // Override react-day-picker's default CSS custom properties with our theme colors
        "--rdp-accent-color": "hsl(var(--primary))",
        "--rdp-accent-background-color": "hsl(var(--accent))",
        "--rdp-today-color": "hsl(var(--primary))",
        "--rdp-range_start-date-background-color": "hsl(var(--primary))",
        "--rdp-range_end-date-background-color": "hsl(var(--primary))",
        "--rdp-range_start-color": "hsl(var(--primary-foreground))",
        "--rdp-range_end-color": "hsl(var(--primary-foreground))",
        "--rdp-months-gap": "1rem",
      } as React.CSSProperties}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 sm:gap-6",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous: cn(
          "absolute left-1 top-0",
          "inline-flex items-center justify-center",
          "h-7 w-7 bg-transparent p-0",
          "opacity-50 hover:opacity-100",
          "text-muted-foreground",
        ),
        button_next: cn(
          "absolute right-1 top-0",
          "inline-flex items-center justify-center",
          "h-7 w-7 bg-transparent p-0",
          "opacity-50 hover:opacity-100",
          "text-muted-foreground",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: cn(
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          "text-center",
        ),
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm",
          "focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent",
          "[&:has([aria-selected].day-outside)]:bg-accent/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-normal",
          "inline-flex items-center justify-center rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "aria-selected:opacity-100",
        ),
        range_start: "day-range-start rounded-l-md",
        range_end: "day-range-end rounded-r-md",
        range_middle: cn(
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
          "rounded-none",
        ),
        selected: cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary hover:text-primary-foreground",
          "focus:bg-primary focus:text-primary-foreground",
        ),
        today: "bg-accent text-accent-foreground",
        outside: cn(
          "day-outside text-muted-foreground opacity-50",
          "aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          "aria-selected:opacity-30",
        ),
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
