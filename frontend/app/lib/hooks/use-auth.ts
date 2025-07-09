import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "~/routes";

export function useAuth({ protectedRoute = false } = {}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        const isAuth = Boolean(token);
        setIsAuthenticated(isAuth);

        if (protectedRoute && !isAuth) {
            navigate(ROUTES.AUTH, { replace: true, state: { from: location.pathname } });
        }
    }, [protectedRoute, navigate, location]);

    return { isAuthenticated };
}
