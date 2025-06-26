"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.actions"; // Changed to signUpUser
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User } from "lucide-react"; // Added User icon
import Link from "next/link";

interface FormState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string | undefined>;
}

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-6 text-base font-medium"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create new account"
      )}
    </Button>
  );
};

export function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const initialState: FormState = {
    success: false,
    message: "",
    fieldErrors: {},
  };

  const [state, formAction] = useActionState(signUpUser, initialState);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.push(callbackUrl);
    } else if (state.message) {
      setShowError(true);
    }
  }, [state, callbackUrl, router]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6"
    >
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              required
              className="pl-10 py-6"
              placeholder="John Doe"
              aria-invalid={!!state.fieldErrors?.name}
            />
          </div>
          {state.fieldErrors?.name && (
            <p className="text-red-500 text-xs mt-1">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="pl-10 py-6"
              placeholder="name@company.com"
              aria-invalid={!!state.fieldErrors?.email}
            />
          </div>
          {state.fieldErrors?.email && (
            <p className="text-red-500 text-xs mt-1">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="pl-10 py-6"
              placeholder="••••••••"
              aria-invalid={!!state.fieldErrors?.password}
            />
          </div>
          {state.fieldErrors?.password && (
            <p className="text-red-500 text-xs mt-1">
              {state.fieldErrors.password}
            </p>
          )}
        </div>
      </div>

      <SignUpButton />

      {showError && state.message && !state.success && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="text-sm">{state.message}</div>
        </div>
      )}
    </form>
  );
} 