import * as React from "react";
import { cn } from "../lib/utils";
import type { TypographySize, Color } from "./tokens";

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  size?: TypographySize;
  color?: Color;
  trim?: "normal" | "start" | "end" | "both";
  truncate?: boolean;
  wrap?: "wrap" | "nowrap" | "pretty" | "balance";
}

export const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  (
    {
      size = "3",
      color = "default",
      trim = "normal",
      truncate = false,
      wrap = "wrap",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          // Base styles
          "font-sans italic",
          "border-l-4 border-gray-300 pl-4 py-2",
          "dark:border-gray-600",
          
          // Text trimming
          trim === "start" && "leading-trim-start",
          trim === "end" && "leading-trim-end", 
          trim === "both" && "leading-trim-both",
          
          // Truncation
          truncate && "truncate",
          
          // Text wrapping
          wrap === "nowrap" && "whitespace-nowrap",
          wrap === "pretty" && "text-pretty",
          wrap === "balance" && "text-balance",
          
          // Color variants
          color === "info" && [
            "border-l-blue-500 text-blue-700",
            "dark:border-l-blue-400 dark:text-blue-300",
          ],
          color === "success" && [
            "border-l-green-500 text-green-700",
            "dark:border-l-green-400 dark:text-green-300",
          ],
          color === "warning" && [
            "border-l-yellow-500 text-yellow-700",
            "dark:border-l-yellow-400 dark:text-yellow-300",
          ],
          color === "error" && [
            "border-l-red-500 text-red-700",
            "dark:border-l-red-400 dark:text-red-300",
          ],
          
          className
        )}
        style={style}
        {...props}
      />
    );
  },
);

Quote.displayName = "Quote";