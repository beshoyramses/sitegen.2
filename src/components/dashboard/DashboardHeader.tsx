import Logo from "@/components/shared/Logo";
import { SearchBar } from "./search-bar";
import {NewSiteForm} from "./new-site-form";
import { NotificationButton } from "./notification-button";
import { HelpButton } from "./help-button";
import { UserDropdown } from "./user-dropdown";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Logo />
          <SearchBar />
        </div>

        <div className="flex items-center space-x-3">
          <NewSiteForm />
          <NotificationButton />
          <HelpButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}