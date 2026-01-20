"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../lib/utils";
import type { Color, Size } from "./tokens";

// ============================================================================
// Size & Variant Tokens
// ============================================================================

type MenuVariant = "solid" | "soft";

// Size configurations with CSS values
const sizeConfig: Record<Size, {
  content: { minWidth: string; padding: string };
  item: { padding: string; fontSize: string; lineHeight: string; borderRadius: string };
  shortcut: { fontSize: string };
  iconSize: string;
}> = {
  "1": {
    content: { minWidth: "100px", padding: "2px" },
    item: { padding: "2px 6px", fontSize: "11px", lineHeight: "16px", borderRadius: "2px" },
    shortcut: { fontSize: "9px" },
    iconSize: "10px",
  },
  "2": {
    content: { minWidth: "140px", padding: "4px" },
    item: { padding: "4px 8px", fontSize: "12px", lineHeight: "18px", borderRadius: "3px" },
    shortcut: { fontSize: "10px" },
    iconSize: "12px",
  },
  "3": {
    content: { minWidth: "180px", padding: "6px" },
    item: { padding: "6px 10px", fontSize: "14px", lineHeight: "20px", borderRadius: "4px" },
    shortcut: { fontSize: "11px" },
    iconSize: "14px",
  },
  "4": {
    content: { minWidth: "240px", padding: "8px" },
    item: { padding: "10px 14px", fontSize: "16px", lineHeight: "24px", borderRadius: "6px" },
    shortcut: { fontSize: "13px" },
    iconSize: "18px",
  },
};

// Color styles for item hover/focus states
// Base UI uses data-highlighted for keyboard navigation, we also add hover for mouse
// Color affects text color always, and background on hover/highlight
const itemColorStyles: Record<Color, { solid: string; soft: string }> = {
  default: {
    solid: "hover:bg-gray-100 dark:hover:bg-gray-800 data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-800",
    soft: "hover:bg-gray-100 dark:hover:bg-gray-800 data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-800",
  },
  primary: {
    solid: "text-indigo-600 hover:bg-indigo-600 hover:text-white data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white",
    soft: "text-indigo-600 hover:bg-indigo-600/10 data-[highlighted]:bg-indigo-600/10",
  },
  neutral: {
    solid: "text-gray-600 hover:bg-gray-500 hover:text-white data-[highlighted]:bg-gray-500 data-[highlighted]:text-white dark:text-gray-400",
    soft: "text-gray-600 hover:bg-gray-500/10 data-[highlighted]:bg-gray-500/10 dark:text-gray-400",
  },
  info: {
    solid: "text-blue-600 hover:bg-blue-600 hover:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white",
    soft: "text-blue-600 hover:bg-blue-500/10 data-[highlighted]:bg-blue-500/10",
  },
  success: {
    solid: "text-green-600 hover:bg-green-600 hover:text-white data-[highlighted]:bg-green-600 data-[highlighted]:text-white",
    soft: "text-green-600 hover:bg-green-500/10 data-[highlighted]:bg-green-500/10",
  },
  warning: {
    solid: "text-amber-600 hover:bg-amber-500 hover:text-white data-[highlighted]:bg-amber-500 data-[highlighted]:text-white",
    soft: "text-amber-600 hover:bg-amber-500/10 data-[highlighted]:bg-amber-500/10",
  },
  error: {
    solid: "text-red-600 hover:bg-red-600 hover:text-white data-[highlighted]:bg-red-600 data-[highlighted]:text-white",
    soft: "text-red-600 hover:bg-red-500/10 data-[highlighted]:bg-red-500/10",
  },
};

// Context for sharing props across components
interface ContextMenuContextValue {
  size: Size;
  variant: MenuVariant;
  color: Color;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue>({
  size: "2",
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
  size?: Size;
  /** Visual variant */
  variant?: MenuVariant;
  /** Accent color for item highlights */
  color?: Color;
  /** Additional class names */
  className?: string;
  /** Menu items */
  children: React.ReactNode;
}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  (
    {
      size = "2",
      variant = "solid",
      color = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size];

    const contentStyles: React.CSSProperties = {
      minWidth: config.content.minWidth,
      padding: config.content.padding,
    };

    return (
      <ContextMenuContext.Provider value={{ size, variant, color }}>
        <ContextMenuPrimitive.Portal>
          <ContextMenuPrimitive.Positioner>
            <ContextMenuPrimitive.Popup
              ref={ref}
              style={{
                ...contentStyles,
                border: 'none',
                outline: 'none',
              }}
              className={cn(
                "z-50 overflow-hidden rounded-md border-0",
                "shadow-lg bg-white dark:bg-zinc-900",
                "text-zinc-900 dark:text-zinc-100",
                className,
              )}
              {...props}
            >
              {children}
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
    const config = sizeConfig[context.size];
    const itemColor = color || context.color;

    const itemStyles: React.CSSProperties = {
      padding: config.item.padding,
      fontSize: config.item.fontSize,
      lineHeight: config.item.lineHeight,
      borderRadius: config.item.borderRadius,
    };

    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        style={itemStyles}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 outline-none",
          "transition-colors duration-75",
          itemColorStyles[itemColor][context.variant],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span
            style={{ fontSize: config.shortcut.fontSize }}
            className="ml-auto text-muted-foreground/70 tracking-widest"
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
    const config = sizeConfig[context.size];
    const itemColor = color || context.color;

    const itemStyles: React.CSSProperties = {
      padding: config.item.padding,
      paddingLeft: `calc(${config.item.padding.split(" ")[0]} + 20px)`,
      fontSize: config.item.fontSize,
      lineHeight: config.item.lineHeight,
      borderRadius: config.item.borderRadius,
    };

    const iconStyles: React.CSSProperties = {
      width: config.iconSize,
      height: config.iconSize,
    };

    return (
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        style={itemStyles}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 outline-none",
          "transition-colors duration-75",
          itemColorStyles[itemColor][context.variant],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex items-center justify-center">
          <ContextMenuPrimitive.CheckboxItemIndicator>
            <Check style={iconStyles} strokeWidth={2.5} />
          </ContextMenuPrimitive.CheckboxItemIndicator>
        </span>
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span
            style={{ fontSize: config.shortcut.fontSize }}
            className="ml-auto text-muted-foreground/70 tracking-widest"
          >
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
  const config = sizeConfig[context.size];
  const itemColor = color || context.color;

  const itemStyles: React.CSSProperties = {
    padding: config.item.padding,
    paddingLeft: `calc(${config.item.padding.split(" ")[0]} + 20px)`,
    fontSize: config.item.fontSize,
    lineHeight: config.item.lineHeight,
    borderRadius: config.item.borderRadius,
  };

  const iconStyles: React.CSSProperties = {
    width: config.iconSize,
    height: config.iconSize,
  };

  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      value={value}
      disabled={disabled}
      style={itemStyles}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none",
        "transition-colors duration-75",
        itemColorStyles[itemColor][context.variant],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Circle style={iconStyles} className="fill-current" strokeWidth={0} />
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
    const config = sizeConfig[context.size];

    const labelStyles: React.CSSProperties = {
      padding: config.item.padding,
      fontSize: config.item.fontSize,
      lineHeight: config.item.lineHeight,
    };

    return (
      <div
        ref={ref}
        style={labelStyles}
        className={cn(
          "font-medium text-muted-foreground",
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
      className={cn("h-px bg-muted my-1", className)}
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
  const config = sizeConfig[context.size];
  const itemColor = color || context.color;

  const itemStyles: React.CSSProperties = {
    padding: config.item.padding,
    fontSize: config.item.fontSize,
    lineHeight: config.item.lineHeight,
    borderRadius: config.item.borderRadius,
  };

  const iconStyles: React.CSSProperties = {
    width: config.iconSize,
    height: config.iconSize,
  };

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      disabled={disabled}
      style={itemStyles}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none",
        "transition-colors duration-75",
        itemColorStyles[itemColor][context.variant],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronRight style={iconStyles} className="ml-auto opacity-60" />
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
  const config = sizeConfig[context.size];

  const contentStyles: React.CSSProperties = {
    minWidth: config.content.minWidth,
    padding: config.content.padding,
    border: 'none',
    outline: 'none',
  };

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner sideOffset={sideOffset} side="right" align="start">
        <ContextMenuPrimitive.Popup
          ref={ref}
          style={contentStyles}
          className={cn(
            "z-50 overflow-hidden rounded-md border-0",
            "shadow-lg bg-white dark:bg-zinc-900",
            "text-zinc-900 dark:text-zinc-100",
            context.variant === "soft" && "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md",
            className,
          )}
          {...props}
        >
          {children}
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
