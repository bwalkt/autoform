import { FieldConfig } from "@autoform/core";
import { fieldConfig as zodBaseFieldConfig } from "@autoform/zod";
// import { withFieldConfig as ajvWithFieldConfig } from "@autoform/ajv";
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
export function buildZodFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof zodBaseFieldConfig> {
  return (config) =>
    zodBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

// Commented out until AJV fieldConfig is properly implemented
// export function buildAjvFieldConfig<
//   FieldTypes = string,
//   CustomData = Record<string, any>,
// >(): (
//   config: FieldConfig<
//     ReactNode,
//     FieldTypes,
//     React.ComponentType<FieldWrapperProps>,
//     CustomData
//   >
// ) => ReturnType<typeof ajvBaseFieldConfig> {
//   return (config) =>
//     ajvBaseFieldConfig<
//       ReactNode,
//       FieldTypes,
//       React.ComponentType<FieldWrapperProps>,
//       CustomData
//     >(config);
// }
