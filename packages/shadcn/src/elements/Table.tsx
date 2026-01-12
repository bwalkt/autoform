"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import type { Size } from "./tokens";

// Size configurations
const tableSizes = {
  "1": {
    cell: "px-2 py-1 text-xs",
    header: "px-2 py-1.5 text-xs",
  },
  "2": {
    cell: "px-3 py-2 text-sm",
    header: "px-3 py-2 text-sm",
  },
  "3": {
    cell: "px-4 py-3 text-sm",
    header: "px-4 py-3 text-sm",
  },
  "4": {
    cell: "px-6 py-4 text-base",
    header: "px-6 py-4 text-base",
  },
};

// Variant styles
type TableVariant = "surface" | "ghost";

// Context for sharing props
interface TableContextValue {
  size: Size;
  variant: TableVariant;
}

const TableContext = React.createContext<TableContextValue>({
  size: "2",
  variant: "surface",
});

// ============================================================================
// Root
// ============================================================================

export interface TableRootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Size of the table */
  size?: Size;
  /** Visual variant */
  variant?: TableVariant;
}

const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ size = "2", variant = "surface", className, children, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size, variant }}>
        <div className="relative w-full overflow-auto">
          <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  },
);

TableRoot.displayName = "Table.Root";

// ============================================================================
// Header
// ============================================================================

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext);

    return (
      <thead
        ref={ref}
        className={cn(
          "[&_tr]:border-b",
          variant === "surface" && "bg-muted/50",
          className,
        )}
        {...props}
      />
    );
  },
);

TableHeader.displayName = "Table.Header";

// ============================================================================
// Body
// ============================================================================

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      />
    );
  },
);

TableBody.displayName = "Table.Body";

// ============================================================================
// Footer
// ============================================================================

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
          className,
        )}
        {...props}
      />
    );
  },
);

TableFooter.displayName = "Table.Footer";

// ============================================================================
// Row
// ============================================================================

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext);

    return (
      <tr
        ref={ref}
        className={cn(
          "border-b transition-colors",
          variant === "surface" && "hover:bg-muted/50 data-[state=selected]:bg-muted",
          variant === "ghost" && "hover:bg-accent/50 data-[state=selected]:bg-accent",
          className,
        )}
        {...props}
      />
    );
  },
);

TableRow.displayName = "Table.Row";

// ============================================================================
// Head Cell
// ============================================================================

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(TableContext);
    const sizeConfig = tableSizes[size];

    return (
      <th
        ref={ref}
        className={cn(
          "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          sizeConfig.header,
          className,
        )}
        {...props}
      />
    );
  },
);

TableHead.displayName = "Table.Head";

// ============================================================================
// Cell
// ============================================================================

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(TableContext);
    const sizeConfig = tableSizes[size];

    return (
      <td
        ref={ref}
        className={cn(
          "align-middle [&:has([role=checkbox])]:pr-0",
          sizeConfig.cell,
          className,
        )}
        {...props}
      />
    );
  },
);

TableCell.displayName = "Table.Cell";

// ============================================================================
// Caption
// ============================================================================

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);

TableCaption.displayName = "Table.Caption";

// ============================================================================
// Row Header Cell
// ============================================================================

export interface TableRowHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableRowHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableRowHeaderCellProps
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(TableContext);
  const sizeConfig = tableSizes[size];

  return (
    <th
      ref={ref}
      scope="row"
      className={cn(
        "text-left align-middle font-medium",
        sizeConfig.cell,
        className,
      )}
      {...props}
    />
  );
});

TableRowHeaderCell.displayName = "Table.RowHeaderCell";

// ============================================================================
// Column Header Cell
// ============================================================================

export interface TableColumnHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableColumnHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableColumnHeaderCellProps
>(({ className, ...props }, ref) => {
  const { size } = React.useContext(TableContext);
  const sizeConfig = tableSizes[size];

  return (
    <th
      ref={ref}
      scope="col"
      className={cn(
        "text-left align-middle font-semibold text-foreground",
        sizeConfig.header,
        className,
      )}
      {...props}
    />
  );
});

TableColumnHeaderCell.displayName = "Table.ColumnHeaderCell";

// ============================================================================
// Export compound component
// ============================================================================

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
  RowHeaderCell: TableRowHeaderCell,
  ColumnHeaderCell: TableColumnHeaderCell,
};
