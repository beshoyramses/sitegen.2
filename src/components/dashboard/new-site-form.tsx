'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addWebsite } from '@/lib/actions/website.actions';
import { Loader2, Globe, Image, Star, Plus } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Website'}
    </Button>
  );
}

function FormField({ 
  id, name, label, placeholder, type = "text", required, icon, 
  fieldErrors, textarea = false, minHeight = ""
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  icon?: React.ElementType;
  fieldErrors: any;
  textarea?: boolean;
  minHeight?: string;
}) {
  const IconComponent = icon;
  return (
    <div className={`grid grid-cols-4 gap-4 ${textarea ? 'items-start' : 'items-center'}`}>
      <Label htmlFor={id} className={`text-right ${textarea ? 'mt-2' : ''}`}>
        {label}
      </Label>
      <div className="col-span-3 relative">
        {IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        {textarea ? (
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            className={minHeight}
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className={icon ? 'pl-10' : ''}
            required={required}
          />
        )}
        {fieldErrors?.[name] && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors[name]}</p>
        )}
      </div>
    </div>
  );
}

export function NewSiteForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formKey, setFormKey] = useState(0);
  const [formState, formAction] = useActionState(addWebsite, {
    success: false,
    message: '',
    fieldErrors: {},
  });

  const openDialog = () => {
    setOpen(true);
    setFormKey(prev => prev + 1);
  };

  useEffect(() => {
    if (formState.success) setOpen(false);
  }, [formState]);

  return (
    <>
      <Button
        size="lg"
        className="rounded-full px-4 py-5 shadow-md hover:shadow-lg transition-all"
        onClick={openDialog}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">New Site</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create New Website</DialogTitle>
            <DialogDescription>Add a new website to your portfolio</DialogDescription>
          </DialogHeader>

          <form
            key={formKey}
            ref={formRef}
            action={formAction}
            className="grid gap-4 py-4"
          >
            <FormField
              id="name"
              name="name"
              label="Website Name"
              placeholder="My Awesome Website"
              required={true}
              fieldErrors={formState?.fieldErrors}
            />
            
            <FormField
              id="domain"
              name="domain"
              label="Domain"
              placeholder="example.siteGen"
              required={true}
              icon={Globe}
              fieldErrors={formState?.fieldErrors}
            />
            
            <FormField
              id="description"
              name="description"
              label="Description"
              placeholder="Describe your website..."
              textarea={true}
              minHeight="min-h-[100px]"
              fieldErrors={formState?.fieldErrors}
            />
            
            <FormField
              id="faviconUrl"
              name="faviconUrl"
              label="Favicon URL"
              placeholder="https://example.com/favicon.ico"
              type="url"
              icon={Star}
              fieldErrors={formState?.fieldErrors}
            />
            
            <FormField
              id="imageUrl"
              name="imageUrl"
              label="Image URL"
              placeholder="https://example.com/screenshot.jpg"
              type="url"
              icon={Image}
              fieldErrors={formState?.fieldErrors}
            />

            <div className="flex justify-end gap-3 mt-6 items-center">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <SubmitButton />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}