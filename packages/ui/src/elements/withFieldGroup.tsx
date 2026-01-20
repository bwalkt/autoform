"use client";

import * as React from "react";
import { useFieldGroup } from "./FieldGroupContext";
import type { Size } from "./tokens";
import type { TextFieldVariant } from "./TextField";

interface FieldGroupAwareProps {
  size?: Size;
  variant?: TextFieldVariant;
}

/**
 * HOC that injects FieldGroup context values into wrapped components.
 * Props passed directly to the component take precedence over context values.
 *
 * @example
 * ```tsx
 * import { withFieldGroup, Textarea } from "@bwalkt/ui/elements";
 *
 * const FieldGroupTextarea = withFieldGroup(Textarea);
 *
 * // Now inherits size/variant from FieldGroup context
 * <FieldGroup size="3" variant="soft">
 *   <TextField placeholder="Title" />
 *   <FieldGroupTextarea placeholder="Description" />
 * </FieldGroup>
 * ```
 */
export function withFieldGroup<P extends FieldGroupAwareProps>(
  WrappedComponent: React.ComponentType<P>,
  defaults?: { size?: Size; variant?: TextFieldVariant },
) {
  const WithFieldGroup = React.forwardRef<unknown, P>((props, ref) => {
    const fieldGroup = useFieldGroup();

    const mergedProps = {
      ...props,
      size: props.size ?? fieldGroup?.size ?? defaults?.size ?? "2",
      variant: props.variant ?? fieldGroup?.variant ?? defaults?.variant ?? "outline",
      ref,
    } as P & { ref: typeof ref };

    return <WrappedComponent {...mergedProps} />;
  });

  WithFieldGroup.displayName = `withFieldGroup(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithFieldGroup;
}
