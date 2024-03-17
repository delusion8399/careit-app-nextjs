import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import useEntity from "@/hooks/use-entity";
import { useQueryClient } from "@tanstack/react-query";

interface SwitchActionProps {
  status: string;
  id: string;
}

export const SwitchAction: React.FC<SwitchActionProps> = ({ status, id }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { updateEntity } = useEntity("organization");
  const onChange = async () => {
    try {
      await updateEntity(id, {
        status: status === "active" ? "inactive" : "active",
      });
      toast({ title: "Success", description: "Organization updated" });
    } catch (error) {}
  };

  return <Switch onCheckedChange={onChange} checked={status === "active"} />;
};
