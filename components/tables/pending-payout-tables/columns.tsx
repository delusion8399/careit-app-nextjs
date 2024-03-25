"use client";
import { Goal } from "@/types/goal";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Amount } from "./amount";
import { TopLevel } from "./top-level";

export const columns: ColumnDef<Goal>[] = [
  {
    header: "Top Level",
    id: "topLevel",
    cell: ({ row }) => <TopLevel data={row.original} />,
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
    header: "Amount",
    id: "amount",
    cell: ({ row }) => <Amount data={row.original} />,
  },
  {
    header: "Length",
    accessorFn: (row) => `${row.timeline}m`,
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
