// components/HeaderAuthButtons.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { verifiySession } from "@/lib/session";
import SignOutButton from "./SignOutButton";

export default async function HeaderAuthButtons() {
  const session = await verifiySession().catch(() => null);

  return (
    <div className="hidden md:flex space-x-2">
      {session ? (
        <>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignOutButton />
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}