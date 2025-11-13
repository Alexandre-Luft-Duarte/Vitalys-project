import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as Sonner } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardProfissional from "./pages/DashboardProfissional.tsx";
import AtendimentoClinico from "./pages/AtendimentoClinico.tsx";
import CadastroPaciente from "./pages/CadastroPaciente.tsx";
import CadastroUsuario from "./pages/CadastroUsuario.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard-profissional" element={<DashboardProfissional />} />
                    <Route path="/atendimento-clinico" element={<AtendimentoClinico />} />
                    <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
