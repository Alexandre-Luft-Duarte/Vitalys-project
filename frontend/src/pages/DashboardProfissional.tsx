import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {UserCircle, LogOut, ClipboardList, UserPlus, ClipboardPlus} from "lucide-react";
import { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Paciente {
    id: number;
    nome: string;
    horaChegada: string;
    motivoVisita: string;
    status: "Aguardando" | "Em Atendimento" | "Finalizado",
    nomeProfissional: string;
}

interface AtendimentoBackend {
    idAtendimento: number;
    dataHora: string;
    status: string; 
    motivo: string;
    nomePaciente: string;
    nomeProfissional: string;// <--- Mudou aqui! Vem direto agora.
}

interface PacienteDisplay {
    id: number;
    nome: string;
    horaChegada: string;
    motivoVisita: string;
    status: "Aguardando" | "Em Atendimento" | "Finalizado",
    nomeProfissional: string;
}


const DashboardProfissional = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const tipoUsuario = window.localStorage.getItem("tipoUsuario");
    const [dadosProfissional, setDadosProfissional] = useState<any>(null);

    const fetchAtendimentos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/atendimentos/${dadosProfissional.departamento.idDepartamento}/departamento`);
            if (!response.ok) throw new Error("Falha ao buscar");
            
            const data: AtendimentoBackend[] = await response.json();
            console.log("data", data);
            const ativos = data.filter(a => a.status !== "FINALIZADO");

            console.log("ativos", ativos);
            const formatados: PacienteDisplay[] = ativos.map(item => ({
                id: item.idAtendimento,
                nome: item.nomePaciente,
                horaChegada: new Date(item.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                motivoVisita: item.motivo || "Sem motivo registrado",
                status: mapStatus(item.status),
                nomeProfissional: item.nomeProfissional
            }));
            setPacientes(formatados);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };
    // Auxiliar para converter o Status
    const mapStatus = (statusBackend: string): PacienteDisplay["status"] => {
        if (statusBackend === "EM_ATENDIMENTO") return "Em Atendimento";
        if (statusBackend === "FINALIZADO") return "Finalizado";
        return "Aguardando";
    };

    const handleChamarPaciente = async (id: number) => {
        // Chama o endpoint que muda o status para EM_ATENDIMENTO
        const idUsuario = window.localStorage.getItem("idUsuario");
        const response = await fetch(`http://localhost:8080/api/atendimentos/${id}/iniciar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idProfissional: idUsuario }),
        });

        if (!response.ok) {
            toast({
                title: "Erro",
                description: "Não foi possível iniciar o atendimento.",
                variant: "destructive",
            });
            return
        }

        toast({
            title: "Atendimento Iniciado",
            description: "Direcionando para o prontuário...",
        });

        // Atualiza a lista localmente para feedback visual imediato
        setPacientes((prev) =>
            prev.map((p) => p.id === id ? { ...p, status: "Em Atendimento" } : p)
        );

        // Navega passando o ID real do atendimento
        setTimeout(() => {
            navigate(`/atendimento-clinico/${id}`); // <--- IMPORTANTE: Passar o ID na URL
        }, 1000);
    };

    function abrirAtendimento(id: number) {
        navigate(`/atendimento-clinico/${id}`);
    }

    const getStatusBadge = (status: Paciente["status"]) => {
        const variants: Record<Paciente["status"], { className: string; text: string }> = {
            Aguardando: {
                className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
                text: "Aguardando",
            },
            "Em Atendimento": {
                className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
                text: "Em Atendimento",
            },
            Finalizado: {
                className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
                text: "Finalizado",
            },
        };

        const variant = variants[status];
        return (
            <Badge className={`${variant.className} font-medium`} variant="outline">
                {variant.text}
            </Badge>
        );
    };

    async function buscarDadosProfissional() {
        const idUsuario = window.localStorage.getItem("idUsuario");
        const response = await fetch(`http://localhost:8080/api/profissional/${idUsuario}`);

        const data = await response.json();
        setDadosProfissional(data);
    }

    useEffect(() => {
        buscarDadosProfissional();
    }, []);

    useEffect(() => {
        if (dadosProfissional) fetchAtendimentos();
    }, [dadosProfissional]);

    const pacientesAguardando = pacientes.filter((p) => p.status === "Aguardando").length;
    const pacientesEmAtendimento = pacientes.filter((p) => p.status === "Em Atendimento").length;

    return tipoUsuario === "PROFISSIONAL" ? (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Conteúdo Principal */}
            <main className="container mx-auto px-6 py-8">

                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                        <Button
                            size="lg"
                            onClick={() => navigate("/pacientes-internados")}
                            className="h-20 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md"
                        >
                            <ClipboardPlus className="h-6 w-6 mr-3" />
                            Pacientes Internados
                        </Button>
                    </div>
                </section>

                <div className="bg-card rounded-lg border border-border shadow-md overflow-hidden">
                    {/* Cabeçalho da Tabela */}
                    <div className="bg-gradient-to-r from-primary to-accent px-6 py-4">
                        <h2 className="text-xl font-bold text-primary-foreground">
                            Pacientes na Fila - {dadosProfissional?.departamento?.nome}
                        </h2>
                        <p className="text-sm text-primary-foreground/80 mt-1">
                            Gerencie seus atendimentos de forma eficiente
                        </p>
                    </div>

                    {/* Tabela de Pacientes */}
                    <div className="p-6">
                        {/* 1. VERIFICAÇÃO DE CARREGAMENTO */}
                        {loading ? (
                            <div className="text-center py-16 text-muted-foreground animate-pulse">
                                <p className="text-lg font-medium">Carregando fila de atendimento...</p>
                            </div>
                        ) : pacientes.length === 0 ? (
                            /* 2. LISTA VAZIA (Igual você já tinha) */
                            <div className="text-center py-16 text-muted-foreground">
                                <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-40" />
                                <p className="text-lg font-medium">Nenhum paciente na fila</p>
                                <p className="text-sm mt-1">Aguardando novos pacientes...</p>
                            </div>
                        ) : (
                            /* 3. TABELA DE DADOS (Mantém a estrutura, mas agora usa os dados reais) */
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-border hover:bg-transparent">
                                        <TableHead className="font-semibold text-foreground w-[20%]">Paciente</TableHead>
                                        <TableHead className="font-semibold text-foreground w-[12%]">Hora</TableHead>
                                        <TableHead className="font-semibold text-foreground w-[15%]">Motivo</TableHead>
                                        <TableHead className="font-semibold text-foreground w-[25%]">Responsavel</TableHead>
                                        <TableHead className="font-semibold text-foreground w-[20%]">Status</TableHead>
                                        <TableHead className="font-semibold text-foreground w-[10%] text-center">Ação</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pacientes.map((paciente) => (
                                        <TableRow key={paciente.id} className="border-b border-border hover:bg-muted/50 transition-colors animate-fade-in">
                                            <TableCell className="font-medium text-foreground">{paciente.nome}</TableCell>
                                            <TableCell className="text-muted-foreground">{paciente.horaChegada}</TableCell>
                                            <TableCell className="text-muted-foreground">{paciente.motivoVisita}</TableCell>
                                            <TableCell className="text-muted-foreground">{paciente.nomeProfissional}</TableCell>
                                            <TableCell>{getStatusBadge(paciente.status)}</TableCell>
                                            {paciente.status === "Aguardando" ? (
                                                <TableCell className="text-center">
                                                    <Button size="sm" onClick={() => handleChamarPaciente(paciente.id)} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold shadow-sm">
                                                        Chamar
                                                    </Button>
                                                </TableCell>
                                            ) : null}
                                            {paciente.status === "Em Atendimento" ? (
                                                <TableCell className="text-center" onClick={() => abrirAtendimento(paciente.id)}>
                                                    <span className="text-xs text-muted-foreground italic">Atendendo</span>
                                                </TableCell>
                                            ) : null}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>

                {/* Informações Adicionais */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <span className="text-lg font-bold text-amber-800 dark:text-amber-400">
                  {pacientesAguardando}
                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Aguardando</p>
                                <p className="text-xs text-muted-foreground">Na fila</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-800 dark:text-blue-400">
                  {pacientesEmAtendimento}
                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Em Atendimento</p>
                                <p className="text-xs text-muted-foreground">Consultório</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {pacientes.length}
                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-xs text-muted-foreground">Pacientes hoje</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    ) : (<Navigate to={"/dashboard"} />);
};

export default DashboardProfissional;
