"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/date-time-service";
import { Organization } from "@/types/organization";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { SwitchAction } from "./switch-action";

export const columns: ColumnDef<Organization>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "userId.email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <SwitchAction id={row.original._id} status={row.original.status} />
    ),
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
