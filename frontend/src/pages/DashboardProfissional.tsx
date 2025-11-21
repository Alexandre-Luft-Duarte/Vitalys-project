import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {UserCircle, LogOut, ClipboardList, UserPlus, ClipboardPlus} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Paciente {
    id: number;
    nome: string;
    horaChegada: string;
    motivoVisita: string;
    status: "Aguardando" | "Em Atendimento" | "Finalizado";
}

const pacientesIniciais: Paciente[] = [
    {
        id: 1,
        nome: "Maria Silva Santos",
        horaChegada: "08:15",
        motivoVisita: "Consulta de rotina",
        status: "Aguardando",
    },
    {
        id: 2,
        nome: "João Pedro Oliveira",
        horaChegada: "08:32",
        motivoVisita: "Dor no peito",
        status: "Aguardando",
    },
    {
        id: 3,
        nome: "Ana Paula Costa",
        horaChegada: "08:47",
        motivoVisita: "Check-up anual",
        status: "Em Atendimento",
    },
    {
        id: 4,
        nome: "Carlos Eduardo Mendes",
        horaChegada: "09:05",
        motivoVisita: "Renovação de receita",
        status: "Aguardando",
    },
    {
        id: 5,
        nome: "Fernanda Rodrigues",
        horaChegada: "09:18",
        motivoVisita: "Dor nas costas",
        status: "Aguardando",
    },
];

const DashboardProfissional = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciais);
    const navigate = useNavigate();
    const { toast } = useToast();
    const profissionalNome = "Dr. Roberto Almeida";
    const departamento = "Clínica Geral";

    const handleChamarPaciente = (id: number) => {
        setPacientes((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: "Em Atendimento" as const } : p
            )
        );

        const paciente = pacientes.find((p) => p.id === id);
        if (paciente) {
            toast({
                title: "Paciente chamado",
                description: `${paciente.nome} está sendo direcionado ao consultório.`,
            });

            // Navegar para a tela de atendimento clínico
            setTimeout(() => {
                navigate("/atendimento-clinico");
            }, 1000);
        }
    };

    const handleLogout = () => {
        console.log("Logout");
        window.location.href = "/";
    };

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

    const pacientesAguardando = pacientes.filter((p) => p.status === "Aguardando").length;
    const pacientesEmAtendimento = pacientes.filter((p) => p.status === "Em Atendimento").length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Cabeçalho */}
            {/*<header className="bg-card border-b border-border shadow-sm">*/}
            {/*    <div className="container mx-auto px-6 py-4">*/}
            {/*        <div className="flex items-center justify-between">*/}
            {/*            <div className="flex items-center gap-4">*/}
            {/*                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">*/}
            {/*                    <ClipboardList className="h-6 w-6 text-primary" />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <h1 className="text-xl font-bold text-foreground">*/}
            {/*                        Fila de Atendimento - {departamento}*/}
            {/*                    </h1>*/}
            {/*                    <p className="text-sm text-muted-foreground">*/}
            {/*                        {pacientesAguardando} aguardando • {pacientesEmAtendimento} em atendimento*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="flex items-center gap-4">*/}
            {/*                <Button*/}
            {/*                    variant="outline"*/}
            {/*                    size="sm"*/}
            {/*                    onClick={() => navigate("/pacientes-internados")}*/}
            {/*                    className="border-primary/20 hover:bg-primary/10"*/}
            {/*                >*/}
            {/*                    Ver Pacientes Internados*/}
            {/*                </Button>*/}
            {/*                <div className="flex items-center gap-2 text-sm">*/}
            {/*                    <UserCircle className="h-5 w-5 text-muted-foreground" />*/}
            {/*                    <span className="font-medium text-foreground">{profissionalNome}</span>*/}
            {/*                </div>*/}
            {/*                <Button*/}
            {/*                    variant="ghost"*/}
            {/*                    size="sm"*/}
            {/*                    onClick={handleLogout}*/}
            {/*                    className="text-muted-foreground hover:text-destructive"*/}
            {/*                >*/}
            {/*                    <LogOut className="h-4 w-4" />*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</header>*/}



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
                            Pacientes na Fila
                        </h2>
                        <p className="text-sm text-primary-foreground/80 mt-1">
                            Gerencie seus atendimentos de forma eficiente
                        </p>
                    </div>

                    {/* Tabela de Pacientes */}
                    <div className="p-6">
                        {pacientes.length === 0 ? (
                            <div className="text-center py-16 text-muted-foreground">
                                <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-40" />
                                <p className="text-lg font-medium">Nenhum paciente na fila</p>
                                <p className="text-sm mt-1">Aguardando novos pacientes...</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-border hover:bg-transparent">
                                        <TableHead className="font-semibold text-foreground w-[30%]">
                                            Paciente
                                        </TableHead>
                                        <TableHead className="font-semibold text-foreground w-[12%]">
                                            Hora da Chegada
                                        </TableHead>
                                        <TableHead className="font-semibold text-foreground w-[35%]">
                                            Motivo da Visita
                                        </TableHead>
                                        <TableHead className="font-semibold text-foreground w-[15%]">
                                            Status
                                        </TableHead>
                                        <TableHead className="font-semibold text-foreground w-[8%] text-center">
                                            Ação
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pacientes.map((paciente) => (
                                        <TableRow
                                            key={paciente.id}
                                            className="border-b border-border hover:bg-muted/50 transition-colors animate-fade-in"
                                        >
                                            <TableCell className="font-medium text-foreground">
                                                {paciente.nome}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {paciente.horaChegada}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {paciente.motivoVisita}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(paciente.status)}</TableCell>
                                            <TableCell className="text-center">
                                                {paciente.status === "Aguardando" && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleChamarPaciente(paciente.id)}
                                                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold shadow-sm animate-scale-in"
                                                    >
                                                        Chamar
                                                    </Button>
                                                )}
                                                {paciente.status === "Em Atendimento" && (
                                                    <span className="text-xs text-muted-foreground italic">
                            Atendendo
                          </span>
                                                )}
                                            </TableCell>
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
    );
};

export default DashboardProfissional;
