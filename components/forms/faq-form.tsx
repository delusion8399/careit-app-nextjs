"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useEntity from "@/hooks/use-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { AutosizeTextarea } from "../ui/autosize-textarea";

const formSchema = z.object({
  screen: z.string(),
  text: z.string(),
  url: z.string().url("Invalid youtube URL").optional(),
});

type FaqFormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
  initialData: any | null;
}

export const FaqForm: React.FC<FaqFormProps> = ({ initialData }) => {
  const { createEntity, deleteEntity, updateEntity } =
    useEntity("organization");
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update FAQ" : "Create FAQ";

  const toastMessage = initialData ? "FAQ updated." : "FAQ created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = {
    screen: "",
    text: "",
    url: "",
  };

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FaqFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await updateEntity(initialData._id, {});
      } else {
        await createEntity({});
      }
      toast({
        variant: "default",
        title: "Success",
        description: toastMessage,
      });
      router.refresh();
      router.push(`/dashboard/faq`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await router.refresh();
      initialData && (await deleteEntity(initialData._id));
      router.push(`/dashboard/faq`);
      toast({
        variant: "destructive",
        title: "Success",
        description: "FAQ deleted",
      });
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    initialData && form.reset(initialData);
  }, [initialData]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" onClick={onDelete} />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="screen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { label: "Home", value: "home" },
                        { label: "Shift", value: "shift" },
                        { label: "Goal", value: "goals" },
                        { label: "Contest", value: "contest" },
                      ].map((screen) => (
                        <SelectItem key={screen.value} value={screen.value}>
                          {screen.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <AutosizeTextarea id="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
