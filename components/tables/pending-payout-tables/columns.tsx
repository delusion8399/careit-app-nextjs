"use client";
import { Goal } from "@/types/goal";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: "topLevel",
    header: "Top Level",
  },
  {
    accessorKey: "organization.name",
    header: "Organization",
  },

  {
    header: "User",
    accessorKey: "userName",
  },
  {
    header: "Length",
    accessorFn: (row) => `${row.timeline}m`,
  },
  {
    header: "Action",
    id: "actions",
    // cell: ({ row }) => <CellAction data={row.original} />,
  },
];
