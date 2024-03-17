"use client";
import BreadCrumb from "@/components/breadcrumb";
import { FaqForm } from "@/components/forms/faq-form";
import useEntity from "@/hooks/use-entity";
import { useEffect } from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default function Page({ searchParams: { id } }: paramsProps) {
  const { findOne, entity } = useEntity("faq");

  useEffect(() => {
    if (id) {
      findOne(id);
    }
  }, [id]);

  const breadcrumbItems = [
    { title: "FAQ", link: "/dashboard/faq" },
    {
      title: `${id ? "Update" : "Create"}`,
      link: "/dashboard/faq/create",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <FaqForm initialData={entity ?? null} />
    </div>
  );
}
