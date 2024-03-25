import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";

export function Attention() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="ml-4 space-y-1">
          <div className="text-muted-foreground">
            Raffle ends -12/19 $100 Gift Card
          </div>
        </div>

        <ArrowRight className="text-primary" />
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="ml-4 space-y-1">
          <div className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>
        <ArrowRight className="text-primary" />
      </div>
    </div>
  );
}
