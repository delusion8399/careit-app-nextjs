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
import { Organization } from "@/types/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Organization Name must be at least 3 characters" }),
  address: z.string().min(3, {
    message: "Organization address must be at least 3 characters",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
});

type FaqFormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
  initialData: Organization | null;
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
    name: "",
    address: "",
    email: "",
    password: "",
    logo: "",
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="FAQ name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="FAQ address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email addreess"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  {/* <Dropzone
                    onChange={setFiles}
                    className="w-full"
                    fileExtension=".png"
                  /> */}
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
