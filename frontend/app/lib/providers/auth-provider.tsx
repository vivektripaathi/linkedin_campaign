import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "~/routes";

type User = {
    id: string;
    email: string;
    name?: string;
    [key: string]: any;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
    refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const loadUser = () => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded = jwtDecode<User>(token);
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        window.location.href = ROUTES.AUTH;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                logout,
                refreshUser: loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthContext must be used within AuthProvider");
    return context;
}
