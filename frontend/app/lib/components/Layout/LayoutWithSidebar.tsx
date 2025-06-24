import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import { AppSidebarInset } from "../app-sidebar-inset";

export default function LayoutWithSidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar>
                <AppSidebarInset>{children}</AppSidebarInset>
            </AppSidebar>
        </SidebarProvider>
    );
}
