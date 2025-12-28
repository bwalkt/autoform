import * as React from "react";
import { cn } from "../lib/utils";

export interface EmProps extends React.HTMLAttributes<HTMLElement> {}

export const Em = React.forwardRef<HTMLElement, EmProps>(
  ({ className, ...props }, ref) => {
    return (
      <em
        ref={ref}
        className={cn("italic", className)}
        {...props}
      />
    );
  },
);

Em.displayName = "Em";