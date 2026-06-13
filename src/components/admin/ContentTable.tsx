import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface ContentTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  onDelete: (item: T) => void;
}

/**
 * Generic table component for displaying content collections in the admin panel.
 * Renders a shadcn/ui Table with one row per item and a delete icon button per row.
 */
export function ContentTable<T extends object>({ rows, columns, onDelete }: ContentTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.accessor)}>{col.label}</TableHead>
          ))}
          {/* Extra column header for the delete action */}
          <TableHead className="w-12 sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + 1}
              className="text-center text-muted-foreground py-8"
            >
              No items found.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={String(col.accessor)} className="max-w-xs truncate">
                  {String(row[col.accessor] ?? "")}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(row)}
                  aria-label="Delete item"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
