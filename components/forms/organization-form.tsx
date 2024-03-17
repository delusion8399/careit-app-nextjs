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
import { useToast } from "../ui/use-toast";
import { Organization } from "@/types/organization";
import { Dropzone } from "../ui/dropzone";
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 1;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Organization Name must be at least 3 characters" }),
  // logo: z
  //   .string(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: "You can only add up to 1 images" })
  //   .optional(),
  logo: z.string().optional(),
  address: z.string().min(3, {
    message: "Organization address must be at least 3 characters",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8),
});

type OrganizationFormValues = z.infer<typeof formSchema>;

interface OrganizationFormProps {
  initialData: Organization | null;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  initialData,
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const { createEntity, deleteEntity, updateEntity } =
    useEntity("organization");
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Update Organization" : "Create Organization";

  const toastMessage = initialData
    ? "Organization updated."
    : "Organization created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = {
    name: "",
    address: "",
    email: "",
    password: "",
    logo: "",
  };

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: OrganizationFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await updateEntity(initialData._id, { ...data });
      } else {
        await createEntity({
          ...data,
          isNewUser: true,
          status: "active",
          type: "admin",
          mode: "live",
        });
      }
      toast({
        variant: "default",
        title: "Success",
        description: toastMessage,
      });
      router.refresh();
      router.push(`/dashboard/organizations`);
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
      router.push(`/dashboard/organizations`);
      toast({
        variant: "destructive",
        title: "Success",
        description: "Organization deleted",
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
                      placeholder="Organization name"
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
                      placeholder="Organization address"
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
