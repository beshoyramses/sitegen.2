import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Menu,
  LayoutDashboard,
  BarChart,
  Settings,
} from "lucide-react";
import { UserDropdown } from "@/components/dashboard/UserDropdown";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddWebsiteForm } from "@/components/dashboard/AddWebsiteForm";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { RocketIcon } from "./RocketIcon";
import { verifiySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

export async function DashboardHeader() {
    const session = await verifiySession();
  if (!session) {
    redirect("sign-in")
  }

  const user = await getUserById(session.userId as string);

  return (
    <header className="sticky top-0 z-40 flex min-h-19 items-center gap-4 border-b border-border/30 bg-background/95 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 lg:px-6">
      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden mr-2">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[280px] sm:w-[300px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold tracking-tight">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <RocketIcon className="h-7 w-7 text-primary" />
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Sitegen
                </span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 py-6">
            <nav className="grid gap-1">
              <SheetClose asChild>
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart className="mr-3 h-5 w-5" />
                    Analytics
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Button>
                </Link>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Logo/Title */}
      <div className="hidden lg:block text-xl font-semibold">
        Your Dashboard
      </div>

      <div className="flex flex-1 justify-end items-center gap-3">
        <ThemeToggle />

        {/* Mobile "New Website" button (outside sidebar) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="ml-2 lg:hidden shadow-lg hover:shadow-primary/30"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Website
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Create New Website
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <AddWebsiteForm />
            </div>
          </DialogContent>
        </Dialog>

        {/* Desktop "New Website" button */}
        <div className="hidden lg:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="shadow-lg hover:shadow-primary/30"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                New Website
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Create New Website
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <AddWebsiteForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <UserDropdown user={user}/>
      </div>
    </header>
  );
}