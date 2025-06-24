import { SidebarInset } from "./ui/sidebar";

import { Separator } from "@components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebarInset({ children }: { children: React.ReactNode }) {
    return (
        <SidebarInset className="overflow-x-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
                <div className="flex items-center gap-2 px-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarTrigger className="-ml-1" />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" align="start">
                            Toggle Sidebar <kbd className="ml-2">⌘+b</kbd>
                        </TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-m font-semibold sm:text-lg">
                        Campaigns
                    </h1>
                </div>
            </header>
            <Separator />
            {children}
        </SidebarInset>
    );
}
