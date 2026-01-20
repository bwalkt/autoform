"use client";

import * as React from "react";
import type { Size, FieldGroupLayout, TextFieldVariant } from "@/elements/tokens";

// Props for FieldGroupProvider (optional values)
export interface FieldGroupContextValue {
  size?: Size;
  variant?: TextFieldVariant;
  layout?: FieldGroupLayout;
}

// Resolved values with defaults (always defined)
export interface FieldGroupResolvedValue {
  size: Size;
  variant: TextFieldVariant;
  layout: FieldGroupLayout;
}

const FieldGroupContext = React.createContext<FieldGroupContextValue | null>(null);

export function FieldGroupProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FieldGroupContextValue;
}) {
  return (
    <FieldGroupContext.Provider value={value}>
      {children}
    </FieldGroupContext.Provider>
  );
}

const defaultFieldGroupValue: FieldGroupResolvedValue = {
  size: "2",
  variant: "outline",
  layout: "stacked",
};

export function useFieldGroup(): FieldGroupResolvedValue {
  const context = React.useContext(FieldGroupContext);
  return {
    size: context?.size ?? defaultFieldGroupValue.size,
    variant: context?.variant ?? defaultFieldGroupValue.variant,
    layout: context?.layout ?? defaultFieldGroupValue.layout,
  };
}
