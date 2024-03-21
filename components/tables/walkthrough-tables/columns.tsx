"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date-time-service";
import { Walkthrough } from "@/types/walkthrough";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Walkthrough>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "screen",
    header: "Screen",
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    header: "Date",
    accessorFn: (row) => formatDate(new Date(row.createdAt), "MM/dd/yyyy"),
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
