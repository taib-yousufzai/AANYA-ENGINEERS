import { Trash2, Edit2 } from "lucide-react";
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
  onEdit?: (item: T) => void;
}

/**
 * Generic table component for displaying content collections in the admin panel.
 * Renders a shadcn/ui Table with one row per item and a delete icon button per row.
 */
export function ContentTable<T extends object>({ rows, columns, onDelete, onEdit }: ContentTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.accessor)}>{col.label}</TableHead>
          ))}
          {/* Extra column header for the delete/edit actions */}
          <TableHead className="w-24 text-right">Actions</TableHead>
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
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(row)}
                      aria-label="Edit item"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Edit2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(row)}
                    aria-label="Delete item"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
