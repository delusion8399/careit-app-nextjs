"use client";

import useEntity from "@/hooks/use-entity";
import { PendingPayoutTable } from "./tables/pending-payout-tables/pending-payout-table";
import { useEffect } from "react";
import { columns } from "./tables/pending-payout-tables/columns";

export function PendingPayout() {
  const { find, entities, loading } = useEntity("goal");

  useEffect(() => {
    find({ status: "approval" });
  }, []);

  return (
    <>
      <PendingPayoutTable
        searchKey="topLevel"
        columns={columns}
        data={entities?.goals || []}
        pageCount={1}
      />
    </>
  );
}
