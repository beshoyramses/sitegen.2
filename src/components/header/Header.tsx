import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import HeaderLogo from "../shared/Logo";
import HeaderThemeSwitcher from "./HeaderThemeSwitcher";
import HeaderAuthButtons from "./HeaderAuthButtons";
import HeaderMobileMenu from "./HeaderMobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <HeaderLogo />

        <div className="flex items-center space-x-3">
          <HeaderThemeSwitcher />
          <HeaderAuthButtons />

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <HeaderMobileMenu />
          </Sheet>
        </div>
      </div>
    </header>
  );
}
