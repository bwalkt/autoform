"use client";

import * as React from "react";
import type { Size } from "./tokens";
import type { TextFieldVariant } from "./TextField";

export interface FieldGroupContextValue {
  size?: Size;
  variant?: TextFieldVariant;
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
