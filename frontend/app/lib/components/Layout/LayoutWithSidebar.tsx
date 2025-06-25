import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { AppSidebarInset } from "../app-sidebar-inset";
import { Toaster } from "sonner";

export default function LayoutWithSidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <Toaster richColors position="top-right" />
            <AppSidebar>
                <AppSidebarInset>{children}</AppSidebarInset>
            </AppSidebar>
        </SidebarProvider>
    );
}
