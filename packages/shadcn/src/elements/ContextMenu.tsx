"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../lib/utils";
import type { Color } from "./tokens";

// Size tokens for context menu
const menuSizes = {
  sm: {
    content: "min-w-[180px] text-xs",
    item: "px-2 py-1.5",
    shortcut: "text-[10px]",
    icon: "h-3 w-3",
    indicator: "h-3 w-3",
  },
  md: {
    content: "min-w-[220px] text-sm",
    item: "px-3 py-2",
    shortcut: "text-xs",
    icon: "h-4 w-4",
    indicator: "h-4 w-4",
  },
} as const;

type MenuSize = "sm" | "md";
type MenuVariant = "solid" | "soft";

// Context for sharing props
interface ContextMenuContextValue {
  size: MenuSize;
  variant: MenuVariant;
  color: Color;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue>({
  size: "md",
  variant: "solid",
  color: "default",
});

// ============================================================================
// Root
// ============================================================================

export interface ContextMenuRootProps {
  children: React.ReactNode;
}

const ContextMenuRoot: React.FC<ContextMenuRootProps> = ({ children }) => {
  return <ContextMenuPrimitive.Root>{children}</ContextMenuPrimitive.Root>;
};

ContextMenuRoot.displayName = "ContextMenu.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface ContextMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Trigger
        ref={ref}
        className={cn("outline-none", className)}
        {...props}
      >
        {children}
      </ContextMenuPrimitive.Trigger>
    );
  },
);

ContextMenuTrigger.displayName = "ContextMenu.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface ContextMenuContentProps {
  /** Size of the menu */
  size?: MenuSize;
  /** Visual variant */
  variant?: MenuVariant;
  /** Accent color */
  color?: Color;
  /** Additional class names */
  className?: string;
  /** Menu items */
  children: React.ReactNode;
  /** Side offset from trigger */
  sideOffset?: number;
  /** Alignment offset */
  alignOffset?: number;
}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  (
    {
      size = "md",
      variant = "solid",
      color = "default",
      className,
      children,
      sideOffset = 4,
      alignOffset = 0,
      ...props
    },
    ref,
  ) => {
    const sizeConfig = menuSizes[size];

    return (
      <ContextMenuContext.Provider value={{ size, variant, color }}>
        <ContextMenuPrimitive.Portal>
          <ContextMenuPrimitive.Positioner sideOffset={sideOffset} alignOffset={alignOffset}>
            <ContextMenuPrimitive.Popup
              ref={ref}
              className={cn(
                "z-50 overflow-hidden rounded-md border shadow-lg",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                sizeConfig.content,

                // Variant styles
                variant === "solid" && "bg-popover text-popover-foreground",
                variant === "soft" && "bg-secondary/95 text-secondary-foreground backdrop-blur-sm",

                className,
              )}
              {...props}
            >
              <div className="p-1">{children}</div>
            </ContextMenuPrimitive.Popup>
          </ContextMenuPrimitive.Positioner>
        </ContextMenuPrimitive.Portal>
      </ContextMenuContext.Provider>
    );
  },
);

ContextMenuContent.displayName = "ContextMenu.Content";

// ============================================================================
// Item
// ============================================================================

// Color styles for items
const itemColorStyles: Record<Color, string> = {
  default: "focus:bg-accent focus:text-accent-foreground",
  primary: "focus:bg-primary focus:text-primary-foreground",
  info: "focus:bg-blue-500 focus:text-white",
  success: "focus:bg-green-500 focus:text-white",
  warning: "focus:bg-amber-500 focus:text-white",
  error: "focus:bg-red-500 focus:text-white text-red-600",
};

export interface ContextMenuItemProps {
  /** Color override for this item */
  color?: Color;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Item content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ color, shortcut, disabled, className, children, onClick, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const sizeConfig = menuSizes[context.size];
    const itemColor = color || context.color;

    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm outline-none transition-colors",
          sizeConfig.item,
          itemColorStyles[itemColor],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span
            className={cn(
              "ml-auto text-muted-foreground",
              sizeConfig.shortcut,
            )}
          >
            {shortcut}
          </span>
        )}
      </ContextMenuPrimitive.Item>
    );
  },
);

ContextMenuItem.displayName = "ContextMenu.Item";

// ============================================================================
// CheckboxItem
// ============================================================================

export interface ContextMenuCheckboxItemProps {
  /** Whether the item is checked */
  checked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Color override */
  color?: Color;
  /** Keyboard shortcut */
  shortcut?: string;
  /** Whether disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Item content */
  children: React.ReactNode;
}

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(
  (
    {
      checked,
      onCheckedChange,
      color,
      shortcut,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const context = React.useContext(ContextMenuContext);
    const sizeConfig = menuSizes[context.size];
    const itemColor = color || context.color;

    return (
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm outline-none transition-colors",
          sizeConfig.item,
          "pl-8",
          itemColorStyles[itemColor],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex items-center justify-center">
          <ContextMenuPrimitive.CheckboxItemIndicator>
            <Check className={sizeConfig.indicator} />
          </ContextMenuPrimitive.CheckboxItemIndicator>
        </span>
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className={cn("ml-auto text-muted-foreground", sizeConfig.shortcut)}>
            {shortcut}
          </span>
        )}
      </ContextMenuPrimitive.CheckboxItem>
    );
  },
);

ContextMenuCheckboxItem.displayName = "ContextMenu.CheckboxItem";

// ============================================================================
// RadioGroup
// ============================================================================

export interface ContextMenuRadioGroupProps {
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Radio items */
  children: React.ReactNode;
}

const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.RadioGroup
      ref={ref}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.RadioGroup>
  );
});

ContextMenuRadioGroup.displayName = "ContextMenu.RadioGroup";

// ============================================================================
// RadioItem
// ============================================================================

export interface ContextMenuRadioItemProps {
  /** Value of this radio item */
  value: string;
  /** Color override */
  color?: Color;
  /** Whether disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Item content */
  children: React.ReactNode;
}

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>(({ value, color, disabled, className, children, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext);
  const sizeConfig = menuSizes[context.size];
  const itemColor = color || context.color;

  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm outline-none transition-colors",
        sizeConfig.item,
        "pl-8",
        itemColorStyles[itemColor],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Circle className={cn(sizeConfig.indicator, "fill-current")} />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

ContextMenuRadioItem.displayName = "ContextMenu.RadioItem";

// ============================================================================
// Label
// ============================================================================

export interface ContextMenuLabelProps {
  /** Additional class names */
  className?: string;
  /** Label content */
  children: React.ReactNode;
}

const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const sizeConfig = menuSizes[context.size];

    return (
      <div
        ref={ref}
        className={cn(
          "font-semibold text-foreground",
          sizeConfig.item,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ContextMenuLabel.displayName = "ContextMenu.Label";

// ============================================================================
// Group
// ============================================================================

export interface ContextMenuGroupProps {
  /** Additional class names */
  className?: string;
  /** Group content */
  children: React.ReactNode;
}

const ContextMenuGroup = React.forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Group ref={ref} className={className} {...props}>
        {children}
      </ContextMenuPrimitive.Group>
    );
  },
);

ContextMenuGroup.displayName = "ContextMenu.Group";

// ============================================================================
// Separator
// ============================================================================

export interface ContextMenuSeparatorProps {
  /** Additional class names */
  className?: string;
}

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

ContextMenuSeparator.displayName = "ContextMenu.Separator";

// ============================================================================
// Sub (Submenu)
// ============================================================================

export interface ContextMenuSubProps {
  /** Submenu content */
  children: React.ReactNode;
}

const ContextMenuSub: React.FC<ContextMenuSubProps> = ({ children }) => {
  return <ContextMenuPrimitive.SubmenuRoot>{children}</ContextMenuPrimitive.SubmenuRoot>;
};

ContextMenuSub.displayName = "ContextMenu.Sub";

// ============================================================================
// SubTrigger
// ============================================================================

export interface ContextMenuSubTriggerProps {
  /** Color override */
  color?: Color;
  /** Whether disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Trigger content */
  children: React.ReactNode;
}

const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuSubTriggerProps
>(({ color, disabled, className, children, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext);
  const sizeConfig = menuSizes[context.size];
  const itemColor = color || context.color;

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      disabled={disabled}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm outline-none transition-colors",
        sizeConfig.item,
        itemColorStyles[itemColor],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronRight className={cn("ml-auto", sizeConfig.icon)} />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
});

ContextMenuSubTrigger.displayName = "ContextMenu.SubTrigger";

// ============================================================================
// SubContent
// ============================================================================

export interface ContextMenuSubContentProps {
  /** Additional class names */
  className?: string;
  /** Submenu items */
  children: React.ReactNode;
  /** Side offset */
  sideOffset?: number;
}

const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuSubContentProps
>(({ className, children, sideOffset = 2, ...props }, ref) => {
  const context = React.useContext(ContextMenuContext);
  const sizeConfig = menuSizes[context.size];

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner sideOffset={sideOffset} side="right" align="start">
        <ContextMenuPrimitive.Popup
          ref={ref}
          className={cn(
            "z-50 overflow-hidden rounded-md border shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            sizeConfig.content,

            // Variant styles
            context.variant === "solid" && "bg-popover text-popover-foreground",
            context.variant === "soft" &&
              "bg-secondary/95 text-secondary-foreground backdrop-blur-sm",

            className,
          )}
          {...props}
        >
          <div className="p-1">{children}</div>
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
});

ContextMenuSubContent.displayName = "ContextMenu.SubContent";

// ============================================================================
// Export compound component
// ============================================================================

export const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Label: ContextMenuLabel,
  Group: ContextMenuGroup,
  Separator: ContextMenuSeparator,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
};
