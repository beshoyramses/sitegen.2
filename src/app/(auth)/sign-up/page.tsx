import AuthCard from "@/components/shared/AuthCard";
import { SignUpForm } from "@/components/shared/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Get started with Sitegen today"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    >
      <SignUpForm />
    </AuthCard>
  );
}