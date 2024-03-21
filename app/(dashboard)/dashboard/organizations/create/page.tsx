"use client";
import BreadCrumb from "@/components/breadcrumb";
import { OrganizationForm } from "@/components/forms/organization-form";
import useEntity from "@/hooks/use-entity";
import React, { useEffect } from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default function Page({ searchParams: { id } }: paramsProps) {
  const { findOne, entity } = useEntity("organization");

  useEffect(() => {
    if (id) {
      findOne(id);
    }
  }, [id]);

  const breadcrumbItems = [
    { title: "Organizations", link: "/dashboard/organizations" },
    {
      title: `${id ? "Update" : "Create"}`,
      link: "/dashboard/organizations/create",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <OrganizationForm initialData={entity?.data || null} key={null} />
    </div>
  );
}
