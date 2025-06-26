import AuthCard from "@/components/shared/AuthCard";
import { SignInForm } from "@/components/shared/sign-in-form";


export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue building amazing websites"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="sign-up"
    >
      <SignInForm />
    </AuthCard>
  );
}