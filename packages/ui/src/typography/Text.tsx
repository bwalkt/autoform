import * as React from "react";
import { cn } from "@/lib/utils";
import { typographyTokens, type TypographySize, type Weight, type TypographyColor } from "./tokens";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
  size?: TypographySize;
  weight?: Weight;
  color?: TypographyColor;
  align?: "left" | "center" | "right" | "justify";
  truncate?: boolean;
  wrap?: "wrap" | "nowrap" | "pretty" | "balance";
  highContrast?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "span",
      size = "3",
      weight = "regular",
      color = "default",
      align,
      truncate = false,
      wrap = "wrap",
      highContrast = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as;
    const sizeTokens = typographyTokens.size[size];
    const weightToken = typographyTokens.weight[weight];
    const colorToken = typographyTokens.color[color];

    const textStyles: React.CSSProperties = {
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.lineHeight,
      letterSpacing: sizeTokens.letterSpacing,
      fontWeight: weightToken,
      color: colorToken.text,
      textAlign: align,
      textWrap: wrap,
      ...style,
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          // Base styles
          "font-sans",

          // Text alignment
          align === "left" && "text-left",
          align === "center" && "text-center",
          align === "right" && "text-right",
          align === "justify" && "text-justify",

          // Truncation
          truncate && "truncate",

          // Text wrapping
          wrap === "nowrap" && "whitespace-nowrap",
          wrap === "pretty" && "text-pretty",
          wrap === "balance" && "text-balance",

          // High contrast
          highContrast && "font-medium",

          className
        )}
        style={textStyles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
