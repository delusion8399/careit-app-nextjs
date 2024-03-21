"use client";

import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/walkthrough-tables/columns";
import { WalkthroughTable } from "@/components/tables/walkthrough-tables/walkthrough-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import useEntity from "@/hooks/use-entity";
import { cn } from "@/lib/utils";
import { paramsProps } from "@/types/shared";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const breadcrumbItems = [
  { title: "Walkthrough", link: "/dashboard/walkthrough" },
];
export default function Page({ searchParams }: paramsProps) {
  const { find, entities } = useEntity("walkthrough");
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;
  const pageCount = Math.ceil(entities?.total / pageLimit);

  useEffect(() => {
    find({ type: "admin" });
  }, [page, pageLimit, offset]);

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between">
        <Heading title={`Walkthrough`} />

        <Link
          href={"/dashboard/walkthrough/create"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <WalkthroughTable
        searchKey="screen"
        columns={columns}
        data={entities?.data ?? []}
        pageCount={pageCount}
      />
    </div>
  );
}
