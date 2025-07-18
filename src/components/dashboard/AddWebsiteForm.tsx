"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { insertWebsiteSchema } from "@/lib/validators";
import { createWebsite } from "@/lib/actions/website.actions";
import { useEffect } from "react";

type WebsiteFormValues = z.infer<typeof insertWebsiteSchema>;

export function AddWebsiteForm() {
  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(insertWebsiteSchema),
    defaultValues: {
      name: "",
      description: "",
      domain: "",
      imageUrl: "",
    },
    mode: "onChange", // Enable instant validation
  });

  const [state, formAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      try {
        const data = Object.fromEntries(formData.entries()) as WebsiteFormValues;
        return await createWebsite(data);
      } catch (error) {
        return { 
          success: false, 
          message: error instanceof Error 
            ? error.message 
            : "Failed to create website" 
        };
      }
    },
    null
  );

  useEffect(() => {
    if (!state) return;
    
    if (state.success) {
      toast.success(state.message);
      form.reset();
    } else {
      toast.error(state.message);
    }
  }, [state, form]);

  // Prevent form submission if there are validation errors
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.trigger(); // Trigger validation on all fields
    if (!form.formState.isValid) {
      event.preventDefault();
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <Form {...form}>
      <form 
        action={formAction}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My Awesome Site"
                    {...field}
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="yourdomain.com"
                      {...field}
                      className="rounded-l-none focus-visible:ring-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your website..."
                    className="min-h-[100px] focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Website"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}