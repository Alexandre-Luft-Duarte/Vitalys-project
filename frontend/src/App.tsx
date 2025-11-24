import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as Sonner } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardProfissional from "./pages/DashboardProfissional.tsx";
import AtendimentoClinico from "./pages/AtendimentoClinico.tsx";
import CadastroPaciente from "./pages/CadastroPaciente.tsx";
import CadastroUsuario from "./pages/CadastroUsuario.tsx";
import NotFound from "./pages/NotFound.tsx";
import PacientesInternados from "./pages/PacientesInternados.tsx";
import { AuthLayout } from "./layouts/AuthLayout.tsx";
import {AuthContext} from "./contexts/AuthContext.tsx";
import BuscarPaciente from "./pages/BuscarPaciente.tsx";

const queryClient = new QueryClient();
const tipoUsuario = window.localStorage.getItem("tipoUsuario");
console.log(tipoUsuario);

const App = () => (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                <AuthContext>
                    <Routes>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/cadastro-usuario"} element={<CadastroUsuario />} />
                        <Route path={"*"} element={<NotFound/>}/>
                        <Route element={<AuthLayout />} >
                            <Route path={"/buscar-paciente"} element={<BuscarPaciente />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard-profissional" element={<DashboardProfissional />} />
                            <Route path="/atendimento-clinico/:id" element={<AtendimentoClinico />} />
                            <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
                            <Route path="/pacientes-internados" element={<PacientesInternados />} />
                            <Route path="/" element={
                                tipoUsuario === "PROFISSIONAL" ? 
                                    <Navigate to={"/dashboard-profissional"} /> : 
                                    <Navigate to={"/dashboard"} />
                                } 
                            />
                        </Route>
                    </Routes>
                </AuthContext>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
);

export default App;
