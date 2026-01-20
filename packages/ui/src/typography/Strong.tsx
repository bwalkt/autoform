import * as React from "react";
import { cn } from "../lib/utils";

export interface StrongProps extends React.HTMLAttributes<HTMLElement> {}

export const Strong = React.forwardRef<HTMLElement, StrongProps>(
  ({ className, ...props }, ref) => {
    return (
      <strong
        ref={ref}
        className={cn("font-semibold", className)}
        {...props}
      />
    );
  },
);

Strong.displayName = "Strong";
