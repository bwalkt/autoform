"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Root
// ============================================================================

export interface DialogRootProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state */
  defaultOpen?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

const DialogRoot: React.FC<DialogRootProps> = ({
  open,
  onOpenChange,
  defaultOpen,
  children,
}) => {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </DialogPrimitive.Root>
  );
};

DialogRoot.displayName = "Dialog.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface DialogTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger
        ref={ref}
        className={cn("outline-none", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Trigger>
    );
  },
);

DialogTrigger.displayName = "Dialog.Trigger";

// ============================================================================
// Content
// ============================================================================

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const maxWidthStyles: Record<MaxWidth, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

export interface DialogContentProps {
  /** Maximum width of the dialog */
  maxWidth?: MaxWidth;
  /** Additional class names */
  className?: string;
  /** Dialog content */
  children: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ maxWidth = "md", className, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Popup
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full rounded-lg border bg-background shadow-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "focus:outline-none",
            maxWidthStyles[maxWidth],
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    );
  },
);

DialogContent.displayName = "Dialog.Content";

// ============================================================================
// Header
// ============================================================================

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogHeader.displayName = "Dialog.Header";

// ============================================================================
// Body
// ============================================================================

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogBody.displayName = "Dialog.Body";

// ============================================================================
// Footer
// ============================================================================

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogFooter.displayName = "Dialog.Footer";

// ============================================================================
// Title
// ============================================================================

export interface DialogTitleProps {
  /** Additional class names */
  className?: string;
  /** Title content */
  children: React.ReactNode;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Title>
    );
  },
);

DialogTitle.displayName = "Dialog.Title";

// ============================================================================
// Description
// ============================================================================

export interface DialogDescriptionProps {
  /** Additional class names */
  className?: string;
  /** Description content */
  children: React.ReactNode;
}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Description>
  );
});

DialogDescription.displayName = "Dialog.Description";

// ============================================================================
// Close
// ============================================================================

export interface DialogCloseProps {
  /** Render as child element (for custom close buttons) */
  asChild?: boolean;
  /** Additional class names */
  className?: string;
  /** Close button content */
  children?: React.ReactNode;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    // When asChild is true, render as the child element (e.g., for footer cancel buttons)
    if (asChild && React.isValidElement(children)) {
      return (
        <DialogPrimitive.Close ref={ref} render={children} {...props} />
      );
    }

    // Default: render as X icon button in top-right corner
    return (
      <DialogPrimitive.Close
        ref={ref}
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity",
          "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:pointer-events-none",
          className,
        )}
        {...props}
      >
        {children || <X className="h-4 w-4" />}
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    );
  },
);

DialogClose.displayName = "Dialog.Close";

// ============================================================================
// Export compound component
// ============================================================================

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
