import { CreditCard, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="rounded-full p-0 h-10 w-10 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="User menu"
        >
          <Avatar>
            <AvatarImage src="/user-avatar.jpg" alt="User avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 rounded-xl shadow-lg"
        sideOffset={8}
      >
        <div className="px-2 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </div>
        <Separator className="my-1" />
        <DropdownMenuItem className="py-3 focus:bg-accent cursor-pointer">
          <Settings className="mr-3 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 focus:bg-accent cursor-pointer">
          <CreditCard className="mr-3 h-4 w-4" />
          <span>Billing & Plans</span>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem 
          className="py-3 focus:bg-destructive/10 focus:text-destructive cursor-pointer"
          onClick={() => console.log('Logout initiated')}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}