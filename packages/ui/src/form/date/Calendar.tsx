"use client";

import type * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Color } from "@/elements/tokens";
import "./calendar.css";

export type CalendarSelectionVariant = "solid" | "soft" | "outline";

export type CalendarProps = DayPickerProps & {
  /** Additional class names */
  className?: string;
  /** Visual variant for selected dates */
  selectionVariant?: CalendarSelectionVariant;
  /** Accent color for selections */
  color?: Color;
};

// Direct color values for calendar selections
const colorMap: Record<Color, { accent: string; soft: string }> = {
  default: { accent: "#0d9488", soft: "rgba(13, 148, 136, 0.1)" },
  primary: { accent: "#0d9488", soft: "rgba(13, 148, 136, 0.1)" },
  neutral: { accent: "#6b7280", soft: "rgba(107, 114, 128, 0.1)" },
  info: { accent: "#3b82f6", soft: "rgba(59, 130, 246, 0.1)" },
  success: { accent: "#22c55e", soft: "rgba(34, 197, 94, 0.1)" },
  warning: { accent: "#f59e0b", soft: "rgba(245, 158, 11, 0.1)" },
  error: { accent: "#ef4444", soft: "rgba(239, 68, 68, 0.1)" },
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
  selectionVariant = "solid",
  color = "primary",
  ...props
}: CalendarProps) {
  const colors = colorMap[color];

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rdp-calendar p-3",
        selectionVariant === "soft" && "rdp-variant-soft",
        selectionVariant === "outline" && "rdp-variant-outline",
        className,
      )}
      style={{
        "--cal-accent": colors.accent,
        "--cal-accent-soft": colors.soft,
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
        day: "rdp-day relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: "rdp-day_button",
        range_start: "rdp-range_start",
        range_end: "rdp-range_end",
        range_middle: "rdp-range_middle",
        selected: "rdp-selected",
        today: "rdp-today",
        outside: "rdp-outside",
        disabled: "rdp-disabled",
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
