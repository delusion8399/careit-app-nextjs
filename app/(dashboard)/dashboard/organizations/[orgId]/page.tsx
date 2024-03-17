"use client";
import BreadCrumb from "@/components/breadcrumb";
import { OrganizationForm } from "@/components/forms/organization-form";
import useEntity from "@/hooks/use-entity";
import React, { useEffect } from "react";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: {
    orgId: string;
  };
};

export default function Page({ params: { orgId } }: paramsProps) {
  const { findOne, entity } = useEntity("organization");

  useEffect(() => {
    if (orgId) {
      findOne(orgId);
    }
  }, [orgId]);

  const breadcrumbItems = [
    { title: "Organizations", link: "/dashboard/organizations" },
    {
      title: `${orgId ? "Update" : "Create"}`,
      link: "/dashboard/organizations/new",
    },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <OrganizationForm initialData={entity?.data || null} key={null} />
    </div>
  );
}
