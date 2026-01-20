import * as React from "react";
import { cn } from "../lib/utils";
import { typographyTokens, type TypographySize, type Weight, type TypographyColor } from "./tokens";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TypographySize;
  weight?: Weight;
  color?: TypographyColor;
  align?: "left" | "center" | "right" | "justify";
  truncate?: boolean;
  wrap?: "wrap" | "nowrap" | "pretty" | "balance";
  highContrast?: boolean;
  mb?: string;
  mt?: string;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = "h1",
      size = "6",
      weight = "bold",
      color = "default",
      align,
      truncate = false,
      wrap = "wrap",
      highContrast = false,
      mb,
      mt,
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

    const headingStyles: React.CSSProperties = {
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.lineHeight,
      letterSpacing: sizeTokens.letterSpacing,
      fontWeight: weightToken,
      color: colorToken.text,
      textAlign: align,
      textWrap: wrap,
      marginTop: mt,
      marginBottom: mb,
      ...style,
    };

    return (
      <Component
        ref={ref}
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

          className
        )}
        style={headingStyles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";
