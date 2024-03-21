"use client";
import BreadCrumb from "@/components/breadcrumb";
import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import useEntity from "@/hooks/use-entity";
import { useEffect } from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default function Page({ searchParams: { id } }: paramsProps) {
  const { findOne, entity } = useEntity("walkthrough");

  useEffect(() => {
    if (id) {
      findOne(id);
    }
  }, [id]);

  const breadcrumbItems = [
    { title: "Walkthrough", link: "/dashboard/walkthrough" },
    {
      title: `${id ? "Update" : "Create"}`,
      link: "/dashboard/walkthrough/create",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />

      <WalkthroughForm initialData={entity || null} key={null} />
    </div>
  );
}
