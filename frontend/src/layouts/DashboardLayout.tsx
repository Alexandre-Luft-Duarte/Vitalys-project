import {Navigate} from "react-router-dom";

export const DashboardLayout = () => {
    const tipoUsuario = window.localStorage.getItem("tipoUsuario");

    return tipoUsuario === "PROFISSIONAL" ? (
        <Navigate to={"/dashboard-profissional"} />
    ) : (
        <Navigate to={"/dashboard"} />
    );
};