import {useAuth} from "@/contexts/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";
import HeaderNav from "../components/HeaderNav.tsx";

export function AuthLayout() {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? (
        <>
            <HeaderNav />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    );
}