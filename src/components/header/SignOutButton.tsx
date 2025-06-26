"use client";

import { Button } from "@/components/ui/button";
import { deleteSession } from "@/lib/session";

export default function SignOutButton() {
  
  const handleSignOut = async () => {
    await deleteSession();
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}