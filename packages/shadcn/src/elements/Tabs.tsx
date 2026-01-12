"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "../lib/utils";
import type { Size, Color } from "./tokens";

// Size configurations
const tabsSizes = {
  "1": {
    list: "h-8",
    trigger: "px-2 text-xs",
    content: "pt-2",
  },
  "2": {
    list: "h-9",
    trigger: "px-3 text-sm",
    content: "pt-3",
  },
  "3": {
    list: "h-10",
    trigger: "px-4 text-sm",
    content: "pt-4",
  },
  "4": {
    list: "h-12",
    trigger: "px-5 text-base",
    content: "pt-5",
  },
};

// Variant styles
type TabsVariant = "surface" | "classic";

// Context for sharing props
interface TabsContextValue {
  size: Size;
  variant: TabsVariant;
  color: Color;
}

const TabsContext = React.createContext<TabsContextValue>({
  size: "2",
  variant: "surface",
  color: "default",
});

// ============================================================================
// Root
// ============================================================================

export interface TabsRootProps {
  /** Current active tab value */
  value?: string;
  /** Default active tab value */
  defaultValue?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
  /** Size of the tabs */
  size?: Size;
  /** Visual variant */
  variant?: TabsVariant;
  /** Accent color */
  color?: Color;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      size = "2",
      variant = "surface",
      color = "default",
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TabsContext.Provider value={{ size, variant, color }}>
        <TabsPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          orientation={orientation}
          className={cn(
            orientation === "vertical" && "flex gap-4",
            className,
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = "Tabs.Root";

// ============================================================================
// List
// ============================================================================

export interface TabsListProps {
  /** Additional class names */
  className?: string;
  /** Tab triggers */
  children: React.ReactNode;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { size, variant } = React.useContext(TabsContext);
    const sizeConfig = tabsSizes[size];

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1",
          sizeConfig.list,

          // Variant styles
          variant === "surface" && "rounded-lg bg-muted p-1",
          variant === "classic" && "border-b border-border",

          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    );
  },
);

TabsList.displayName = "Tabs.List";

// Color styles for trigger
const triggerColorStyles: Record<Color, string> = {
  default:
    "data-[selected]:text-foreground data-[selected]:bg-background data-[selected]:shadow-sm",
  primary:
    "data-[selected]:text-primary data-[selected]:bg-primary/10",
  neutral:
    "data-[selected]:text-muted-foreground data-[selected]:bg-muted",
  info: "data-[selected]:text-blue-600 data-[selected]:bg-blue-500/10 dark:data-[selected]:text-blue-400",
  success:
    "data-[selected]:text-green-600 data-[selected]:bg-green-500/10 dark:data-[selected]:text-green-400",
  warning:
    "data-[selected]:text-amber-600 data-[selected]:bg-amber-500/10 dark:data-[selected]:text-amber-400",
  error:
    "data-[selected]:text-red-600 data-[selected]:bg-red-500/10 dark:data-[selected]:text-red-400",
};

// ============================================================================
// Trigger
// ============================================================================

export interface TabsTriggerProps {
  /** Value of this tab */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Tab label */
  children: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { size, color } = React.useContext(TabsContext);
    const sizeConfig = tabsSizes[size];

    return (
      <TabsPrimitive.Tab
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "text-muted-foreground hover:text-foreground",
          sizeConfig.trigger,
          triggerColorStyles[color],
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Tab>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface TabsContentProps {
  /** Value of this tab panel */
  value: string;
  /** Whether to force mount */
  forceMount?: boolean;
  /** Additional class names */
  className?: string;
  /** Tab content */
  children: React.ReactNode;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { size } = React.useContext(TabsContext);
    const sizeConfig = tabsSizes[size];

    return (
      <TabsPrimitive.Panel
        ref={ref}
        value={value}
        className={cn(
          "ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          sizeConfig.content,
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Panel>
    );
  },
);

TabsContent.displayName = "Tabs.Content";

// ============================================================================
// Export compound component
// ============================================================================

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
