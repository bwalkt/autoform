import * as React from "react";
import { cn } from "../lib/utils";
import { designTokens, type TypographySize, type Weight, type Color } from "./tokens";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TypographySize;
  weight?: Weight;
  color?: Color;
  align?: "left" | "center" | "right" | "justify";
  trim?: "normal" | "start" | "end" | "both";
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
      trim = "normal",
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
    const typographyTokens = designTokens.typography[size];
    const weightToken = designTokens.weight[weight];
    const colorTokens = designTokens.color[color];

    const headingStyles: React.CSSProperties = {
      fontSize: typographyTokens.fontSize,
      lineHeight: typographyTokens.lineHeight,
      letterSpacing: typographyTokens.letterSpacing,
      fontWeight: weightToken,
      color: highContrast ? colorTokens.text : `var(--color-${color}-text, ${colorTokens.text})`,
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
          
          // Text trimming (leading trim support)
          trim === "start" && "leading-trim-start",
          trim === "end" && "leading-trim-end", 
          trim === "both" && "leading-trim-both",
          
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