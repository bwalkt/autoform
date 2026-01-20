"use client";

import * as React from "react";
import type { Size, FieldGroupLayout, TextFieldVariant } from "./tokens";

export interface FieldGroupContextValue {
  size?: Size;
  variant?: TextFieldVariant;
  layout?: FieldGroupLayout;
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

export function useFieldGroup(): FieldGroupContextValue | null {
  return React.useContext(FieldGroupContext);
}
