import * as React from "react";
import { cn } from "../../lib/utils";
import { designTokens, type TypographySize, type Color } from "../tokens";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  size?: TypographySize;
  color?: Color;
  variant?: "solid" | "soft" | "outline" | "ghost";
  highContrast?: boolean;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  (
    {
      size = "2",
      color = "default",
      variant = "soft",
      highContrast = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const typographyTokens = designTokens.typography[size];
    
    const codeStyles: React.CSSProperties = {
      fontSize: typographyTokens.fontSize,
      ...style,
    };

    return (
      <code
        ref={ref}
        className={cn(
          // Base styles
          "font-mono inline-flex items-center",
          "rounded-sm border px-1.5 py-0.5",
          "font-medium",
          
          // Variant styles
          variant === "solid" && [
            "bg-gray-900 text-gray-50",
            "border-gray-900",
          ],
          variant === "soft" && [
            "bg-gray-100 text-gray-900", 
            "border-gray-200",
            "dark:bg-gray-800 dark:text-gray-100",
            "dark:border-gray-700",
          ],
          variant === "outline" && [
            "border-gray-300 bg-transparent",
            "dark:border-gray-600",
          ],
          variant === "ghost" && [
            "border-transparent bg-transparent",
          ],
          
          // Color variants
          color === "info" && variant === "soft" && [
            "bg-blue-50 text-blue-900 border-blue-200",
            "dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
          ],
          color === "success" && variant === "soft" && [
            "bg-green-50 text-green-900 border-green-200",
            "dark:bg-green-950 dark:text-green-100 dark:border-green-800",
          ],
          color === "warning" && variant === "soft" && [
            "bg-yellow-50 text-yellow-900 border-yellow-200",
            "dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800",
          ],
          color === "error" && variant === "soft" && [
            "bg-red-50 text-red-900 border-red-200",
            "dark:bg-red-950 dark:text-red-100 dark:border-red-800",
          ],
          
          // High contrast
          highContrast && "contrast-more:border-gray-900 contrast-more:text-gray-900",
          
          className
        )}
        style={codeStyles}
        {...props}
      />
    );
  },
);

Code.displayName = "Code";