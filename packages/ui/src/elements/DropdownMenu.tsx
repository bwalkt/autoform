"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Color } from "./tokens";

// Size tokens for dropdown menu
const menuSizes = {
  "1": {
    content: "min-w-[180px] text-xs",
    item: "px-2 py-1.5",
    shortcut: "text-[10px]",
    icon: "h-3 w-3",
    indicator: "h-3 w-3",
  },
  "2": {
    content: "min-w-[220px] text-sm",
    item: "px-3 py-2",
    shortcut: "text-xs",
    icon: "h-4 w-4",
    indicator: "h-4 w-4",
  },
} as const;

type MenuSize = "1" | "2";
type MenuVariant = "solid" | "soft";

// Context for sharing props
interface DropdownMenuContextValue {
  size: MenuSize;
  variant: MenuVariant;
  color: Color;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({
  size: "2",
  variant: "solid",
  color: "default",
});

// ============================================================================
// Root
// ============================================================================

export interface DropdownMenuRootProps {
  children: React.ReactNode;
  /** Whether menu is open */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = ({
  children,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <MenuPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </MenuPrimitive.Root>
  );
};

DropdownMenuRoot.displayName = "DropdownMenu.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      className={cn("outline-none", className)}
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface DropdownMenuContentProps {
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
  /** Side of trigger to open */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment relative to trigger */
  align?: "start" | "center" | "end";
  /** Side offset from trigger */
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    {
      size = "2",
      variant = "solid",
      color = "default",
      className,
      children,
      side = "bottom",
      align = "start",
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const sizeConfig = menuSizes[size];

    return (
      <DropdownMenuContext.Provider value={{ size, variant, color }}>
        <MenuPrimitive.Portal>
          <MenuPrimitive.Positioner side={side} align={align} sideOffset={sideOffset}>
            <MenuPrimitive.Popup
              ref={ref}
              className={cn(
                "z-50 overflow-hidden rounded-md border shadow-lg",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                sizeConfig.content,

                // Variant styles
                variant === "solid" && "bg-popover text-popover-foreground",
                variant === "soft" &&
                  "bg-secondary/95 text-secondary-foreground backdrop-blur-sm",

                className,
              )}
              {...props}
            >
              <div className="p-1">{children}</div>
            </MenuPrimitive.Popup>
          </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
      </DropdownMenuContext.Provider>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenu.Content";

// Color styles for items
const itemColorStyles: Record<Color, string> = {
  default: "focus:bg-accent focus:text-accent-foreground",
  primary: "focus:bg-primary focus:text-primary-foreground",
  neutral: "focus:bg-muted focus:text-muted-foreground",
  info: "focus:bg-blue-500 focus:text-white",
  success: "focus:bg-green-500 focus:text-white",
  warning: "focus:bg-amber-500 focus:text-white",
  error: "focus:bg-red-500 focus:text-white text-red-600",
};

// ============================================================================
// Item
// ============================================================================

export interface DropdownMenuItemProps {
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

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ color, shortcut, disabled, className, children, onClick, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const sizeConfig = menuSizes[context.size];
    const itemColor = color || context.color;

    return (
      <MenuPrimitive.Item
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
            className={cn("ml-auto text-muted-foreground", sizeConfig.shortcut)}
          >
            {shortcut}
          </span>
        )}
      </MenuPrimitive.Item>
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenu.Item";

// ============================================================================
// CheckboxItem
// ============================================================================

export interface DropdownMenuCheckboxItemProps {
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

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
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
    const context = React.useContext(DropdownMenuContext);
    const sizeConfig = menuSizes[context.size];
    const itemColor = color || context.color;

    return (
      <MenuPrimitive.CheckboxItem
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
          <MenuPrimitive.CheckboxItemIndicator>
            <Check className={sizeConfig.indicator} />
          </MenuPrimitive.CheckboxItemIndicator>
        </span>
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className={cn("ml-auto text-muted-foreground", sizeConfig.shortcut)}>
            {shortcut}
          </span>
        )}
      </MenuPrimitive.CheckboxItem>
    );
  },
);

DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

// ============================================================================
// RadioGroup
// ============================================================================

export interface DropdownMenuRadioGroupProps {
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Radio items */
  children: React.ReactNode;
}

const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioGroupProps
>(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <MenuPrimitive.RadioGroup
      ref={ref}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </MenuPrimitive.RadioGroup>
  );
});

DropdownMenuRadioGroup.displayName = "DropdownMenu.RadioGroup";

// ============================================================================
// RadioItem
// ============================================================================

export interface DropdownMenuRadioItemProps {
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

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>(({ value, color, disabled, className, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const sizeConfig = menuSizes[context.size];
  const itemColor = color || context.color;

  return (
    <MenuPrimitive.RadioItem
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
        <MenuPrimitive.RadioItemIndicator>
          <Circle className={cn(sizeConfig.indicator, "fill-current")} />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});

DropdownMenuRadioItem.displayName = "DropdownMenu.RadioItem";

// ============================================================================
// Label
// ============================================================================

export interface DropdownMenuLabelProps {
  /** Additional class names */
  className?: string;
  /** Label content */
  children: React.ReactNode;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const sizeConfig = menuSizes[context.size];

    return (
      <div
        ref={ref}
        className={cn("font-semibold text-foreground", sizeConfig.item, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownMenuLabel.displayName = "DropdownMenu.Label";

// ============================================================================
// Group
// ============================================================================

export interface DropdownMenuGroupProps {
  /** Additional class names */
  className?: string;
  /** Group content */
  children: React.ReactNode;
}

const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MenuPrimitive.Group ref={ref} className={className} {...props}>
        {children}
      </MenuPrimitive.Group>
    );
  },
);

DropdownMenuGroup.displayName = "DropdownMenu.Group";

// ============================================================================
// Separator
// ============================================================================

export interface DropdownMenuSeparatorProps {
  /** Additional class names */
  className?: string;
}

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenu.Separator";

// ============================================================================
// Sub (Submenu)
// ============================================================================

export interface DropdownMenuSubProps {
  /** Submenu content */
  children: React.ReactNode;
}

const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  return <MenuPrimitive.SubmenuRoot>{children}</MenuPrimitive.SubmenuRoot>;
};

DropdownMenuSub.displayName = "DropdownMenu.Sub";

// ============================================================================
// SubTrigger
// ============================================================================

export interface DropdownMenuSubTriggerProps {
  /** Color override */
  color?: Color;
  /** Whether disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Trigger content */
  children: React.ReactNode;
}

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ color, disabled, className, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const sizeConfig = menuSizes[context.size];
  const itemColor = color || context.color;

  return (
    <MenuPrimitive.SubmenuTrigger
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
    </MenuPrimitive.SubmenuTrigger>
  );
});

DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";

// ============================================================================
// SubContent
// ============================================================================

export interface DropdownMenuSubContentProps {
  /** Additional class names */
  className?: string;
  /** Submenu items */
  children: React.ReactNode;
  /** Side offset */
  sideOffset?: number;
}

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ className, children, sideOffset = 2, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const sizeConfig = menuSizes[context.size];

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner sideOffset={sideOffset} side="right" align="start">
        <MenuPrimitive.Popup
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
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
});

DropdownMenuSubContent.displayName = "DropdownMenu.SubContent";

// ============================================================================
// Export compound component
// ============================================================================

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Group: DropdownMenuGroup,
  Separator: DropdownMenuSeparator,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
};
