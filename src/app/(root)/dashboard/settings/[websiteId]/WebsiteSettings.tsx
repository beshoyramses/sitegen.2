"use client";

import { useActionState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/shared/icons";
import { updateWebsite } from "@/lib/actions/website.actions";
import { Website } from "@/types";
import { toast } from "sonner";
import { insertWebsiteSchema } from "@/lib/validators"; 

export default function WebsiteSettings({ website }: { website: Website }) {
  return (
    <div className="container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Website Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your website details and appearance
        </p>

        <SettingsForm website={website} />
      </div>
    </div>
  );
}

function SettingsForm({ website }: { website: Website }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        // Extract and validate form data
        const rawData = {
          name: formData.get("name") as string,
          domain: formData.get("domain") as string,
          description: formData.get("description") as string,
          imageUrl: formData.get("imageUrl") as string,
        };

        // Validate with Zod schema
        const validatedData = insertWebsiteSchema.parse(rawData);

        // Update website with validated data
        console.log(validatedData)
        const result = await updateWebsite(validatedData as Website, website.id as string);

        if (result.success) {
          toast("Website settings updated successfully");
          return { success: true, message: "Webstie Updated Succeffuly", errors: {} };
        } else {
          toast.error(result.message || "Failed to update website settings");
          return { 
            success: false, 
            message: result.message || "Update failed", 
            errors: {} 
          };
        }
      } catch (error: any) {
        // Handle Zod validation errors
        if (error.errors) {
          const fieldErrors = error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            acc[field] = curr.message;
            return acc;
          }, {});
          
          return {
            success: false,
            message: "Validation failed",
            errors: fieldErrors
          };
        }
        
        toast.error(error.message || "An unexpected error occurred");
        return { 
          success: false, 
          message: error.message || "Unexpected error", 
          errors: {} 
        };
      }
    },
    { success: false, message: "", errors: {} }
  );

  return (
    <form action={formAction}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Update your website{"'"}s basic details
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Website Name *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={website.name}
                placeholder="Enter website name"
                className="mt-2"
                aria-invalid={!!state.errors?.name}
              />
              {state.errors?.name && (
                <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="domain">Domain *</Label>
              <Input
                id="domain"
                name="domain"
                defaultValue={website.domain}
                placeholder="example.com"
                className="mt-2"
                aria-invalid={!!state.errors?.domain}
              />
              {state.errors?.domain && (
                <p className="mt-1 text-sm text-red-600">{state.errors.domain}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={website.description || ""}
              placeholder="Describe your website"
              className="mt-2 min-h-[120px]"
              aria-invalid={!!state.errors?.description}
            />
            {state.errors?.description && (
              <p className="mt-1 text-sm text-red-600">{state.errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Customize how your website appears</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={website.imageUrl || ""}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
              aria-invalid={!!state.errors?.imageUrl}
            />
            {state.errors?.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{state.errors.imageUrl}</p>
            )}

            {website.imageUrl && (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Preview
                </div>
                <div className="border rounded-lg overflow-hidden max-w-[400px]">
                  <img
                    src={website.imageUrl}
                    alt="Website preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Your website{"'"}s performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="text-muted-foreground text-sm">Views</div>
            <div className="text-2xl font-bold mt-1">
              {website?.views?.toLocaleString()}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-muted-foreground text-sm">Avg. Time</div>
            <div className="text-2xl font-bold mt-1">
              {website.averageTimeSpent}s
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="text-muted-foreground text-sm">Conversion Rate</div>
            <div className="text-2xl font-bold mt-1">
              {website.conversionRate?.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end items-center">
        <SubmitButton isPending={isPending} />
      </div>
    </form>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="min-w-[150px]">
      {isPending ? (
        <>
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}