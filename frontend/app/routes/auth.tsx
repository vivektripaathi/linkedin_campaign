import { LoginSignupForm } from "@lib/components/login-signup-form";
import { Toaster } from "sonner";

export default function LoginRoute() {
    // useAuth();
    return (
        <main className="flex items-center justify-center min-h-screen px-4">
            <Toaster richColors position="top-right" />
            <LoginSignupForm />
        </main>
    );
}
