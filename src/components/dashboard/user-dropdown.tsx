"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { deleteSession, getUserId } from "@/lib/session";
import { redirect } from "next/navigation";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export function UserDropdown() {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    await deleteSession();
   redirect("/sign-in")
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await getUserId();
        const result = await getUserById(userId);

        if (result) {
          setUser(result);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Get user initials for fallback
  const getUserInitials = () => {
    if (!user?.name) return "US";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image || "/avatar-placeholder.jpg"}
              alt="User avatar"
            />
            <AvatarFallback className="bg-primary text-white">
              {loading ? "..." : getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {loading ? (
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Loading...</p>
            <p className="text-xs text-muted-foreground">Please wait</p>
          </div>
        ) : error ? (
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-red-500">Error</p>
            <p className="text-xs text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium truncate">
                {user?.name || "Unknown User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "No email available"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">💎</span>
              <span>Upgrade to Pro</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ThemeDropdown />
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant={"ghost"} className="p-0" onClick={handleLogOut}>
                <span>👋</span>
                <span>Log out</span>
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
