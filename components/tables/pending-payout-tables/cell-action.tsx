"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useEntity from "@/hooks/use-entity";
import { Goal } from "@/types/goal";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Goal;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast();
  const { updateEntity } = useEntity("goal");
  const { createEntity } = useEntity("goal/approve");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const router = useRouter();

  const onApprove = async () => {
    try {
      setLoading(true);
      await createEntity(data._id);
      await router.refresh();
      router.push(`/dashboard`);
      toast({
        variant: "default",
        title: "Success",
        description: "Payout approved",
      });
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onReject = async () => {
    try {
      setLoading(true);
      await router.refresh();
      await updateEntity(data?._id, {
        status: "inactive",
      });
      router.push(`/dashboard`);
      toast({
        variant: "destructive",
        title: "Success",
        description: "Payout rejected",
      });
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onApprove}
        loading={loading}
      />
      <AlertModal
        isOpen={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={onReject}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRejectOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
