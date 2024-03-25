"use client";

import serviceCaller from "@/lib/service-caller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type EntityNames =
  | "organization"
  | "faq"
  | "walkthrough"
  | "goal/children"
  | "goal"
  | "goal/approve"
  | "points"
  | "organization/top-level-parent";

type FindQueryType = {
  page?: number;
  sort?: "asc" | "desc";
  limit?: number;
  activeTab?: string;
  _q?: string;
  type?: string;
  status?: any;
  startDate?: any;
  endDate?: any;
  organization?: string;
  _id?: string;
};

export default function useEntity<T = any>(entityName: EntityNames) {
  const [entityId, setEntityId] = useState("");
  const [findQuery, setFindQuery] = useState<FindQueryType>();
  const [findEnabled, setFindEnabled] = useState<boolean>(false);
  const [findOneEnabled, setFindOneEnabled] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    isLoading: findLoading,
    data: entities = [],
    isFetching,
    error: findError,
    refetch: refetchFind,
  } = useQuery({
    queryKey: [`find-${entityName}`, findQuery],
    queryFn: () => {
      return serviceCaller(`${entityName}`, { query: findQuery });
    },
    enabled: findEnabled,
  });

  const {
    isLoading: findOneLoading,
    data: entity,
    error: findOneError,
    refetch: refetchFindOne,
  } = useQuery({
    queryKey: [`find-one-${entityName}`, entityId],
    queryFn: () => {
      return serviceCaller(`${entityName}/${entityId}`);
    },
    enabled: findOneEnabled,
  });

  const createMutation = useMutation({
    mutationKey: [`create-${entityName}`],
    mutationFn: (payload) => {
      return serviceCaller(`${entityName}`, {
        method: "POST",
        body: payload,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: [`delete-${entityName}`, entityId],
    mutationFn: (id: string) => {
      return serviceCaller(`${entityName}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`find-${entityName}`] });
      queryClient.invalidateQueries({ queryKey: [`find-one-${entityName}`] });
    },
  });

  const updateMutation = useMutation({
    mutationKey: [`update-${entityName}`, entityId],
    mutationFn: ({ id, ...payload }: { id: string; payload: any }) => {
      return serviceCaller(`${entityName}/${id}`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`find-${entityName}`] });
      queryClient.invalidateQueries({ queryKey: [`find-one-${entityName}`] });
    },
  });

  function find(findQuery: FindQueryType) {
    setFindQuery(findQuery);
    setFindEnabled(true);
  }

  function findOne(id: string) {
    setEntityId(id);
    setFindOneEnabled(true);
  }

  function createEntity(payload: any) {
    return createMutation.mutateAsync(payload);
  }

  function deleteEntity(id: string) {
    return deleteMutation.mutateAsync(id);
  }

  function updateEntity(id: string, payload: any) {
    return updateMutation.mutateAsync({ id, ...payload });
  }
  return {
    findOne,
    entity: entity as T,
    find,
    entities: entities as any,
    isFetching,
    error: findError || findOneError,
    refetch: refetchFindOne || refetchFind,
    loading: findLoading || findOneLoading,
    createEntity,
    deleteEntity,
    updateEntity,
  };
}
