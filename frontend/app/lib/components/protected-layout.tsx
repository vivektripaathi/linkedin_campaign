// app/lib/components/protected-layout.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@lib/providers/auth-provider";
import { PROTECTED_ROUTES, ROUTES } from "~/routes";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        const isProtected = PROTECTED_ROUTES.some((route) =>
            location.pathname.startsWith(route)
        );

        if (isProtected && !isAuthenticated) {
            navigate(ROUTES.AUTH, {
                replace: true,
                state: { from: location.pathname },
            });
        }
    }, [isAuthenticated, loading, location.pathname, navigate]);

    if (loading) {
        // Optional: Loading UI
        return (
            <div className="flex items-center justify-center h-screen text-muted">
                Checking authentication...
            </div>
        );
    }

    return <>{children}</>;
}
