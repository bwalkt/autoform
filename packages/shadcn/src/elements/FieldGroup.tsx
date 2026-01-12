"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { FieldGroupProvider } from "./FieldGroupContext";
import type { Size, Spacing } from "./tokens";
import type { TextFieldVariant } from "./TextField";

// Gap mapping to Tailwind classes
const gapClasses: Record<Spacing, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
  "9": "gap-9",
};

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size to apply to all child form fields */
  size?: Size;
  /** Variant to apply to all child form fields */
  variant?: TextFieldVariant;
  /** Gap between child elements */
  gap?: Spacing;
  /** Children elements */
  children: React.ReactNode;
}

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ size, variant, gap = "4", className, children, ...props }, ref) => {
    return (
      <FieldGroupProvider value={{ size, variant }}>
        <div
          ref={ref}
          className={cn("flex flex-col", gap && gapClasses[gap], className)}
          {...props}
        >
          {children}
        </div>
      </FieldGroupProvider>
    );
  },
);

FieldGroup.displayName = "FieldGroup";
