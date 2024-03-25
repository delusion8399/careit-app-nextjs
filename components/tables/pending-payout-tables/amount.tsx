"use client";
import useEntity from "@/hooks/use-entity";
import { Goal } from "@/types/goal";
import { useEffect } from "react";

interface CellActionProps {
  data: Goal;
}

export const Amount: React.FC<CellActionProps> = ({ data }) => {
  const { findOne, entity } = useEntity("points");

  useEffect(() => {
    if (data?.user?._id) {
      findOne(data.user._id);
    }
  }, [data]);

  return `$${entity?.valueInDollar}`;
};
