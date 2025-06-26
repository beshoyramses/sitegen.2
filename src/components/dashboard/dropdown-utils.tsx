import React from "react";

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function DropdownMenuSubTrigger({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent">
      {children}
      <svg className="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function DropdownMenuSubContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1">
      {children}
    </div>
  );
}