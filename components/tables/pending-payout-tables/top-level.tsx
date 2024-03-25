"use client";
import useEntity from "@/hooks/use-entity";
import { Goal } from "@/types/goal";
import { useEffect } from "react";

interface CellActionProps {
  data: Goal;
}

export const TopLevel: React.FC<CellActionProps> = ({ data }) => {
  const { find: findTopLevelOrganization, entities: topLevelOrganization } =
    useEntity("organization/top-level-parent");

  useEffect(() => {
    if (data?.user?._id) {
      findTopLevelOrganization({ _id: data?.organization?._id });
    }
  }, [data]);

  return topLevelOrganization?.orgTopLevelName;
};
