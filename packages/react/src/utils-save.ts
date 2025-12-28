import { FieldConfig } from "@bwalk/core";
import React, { ReactNode } from "react";
import { FieldWrapperProps } from "./types";

export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key];

    if (current === undefined) {
      return undefined;
    }
  }
  return current;
}
