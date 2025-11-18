import {useAuth} from "@/contexts/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export function AuthLayout() {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}