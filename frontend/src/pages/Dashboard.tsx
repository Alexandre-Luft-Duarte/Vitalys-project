import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCircle, LogOut, UserPlus, Search } from "lucide-react";
import { useState } from "react";
import RegistrarAtendimentoModal from "@/components/RegistrarAtendimentoModal";
import {useNavigate} from "react-router-dom";
import HeaderNav from "@/components/HeaderNav.tsx";

// Dados de exemplo para a fila de chegada
const initialQueue = [
    { id: 1, nome: "Maria Silva Santos", horaChegada: "08:15", departamento: "Triagem" },
    { id: 2, nome: "João Pedro Oliveira", horaChegada: "08:32", departamento: "Cardiologia" },
    { id: 3, nome: "Ana Paula Costa", horaChegada: "08:47", departamento: "Pediatria" },
    { id: 4, nome: "Carlos Eduardo Mendes", horaChegada: "09:05", departamento: "Triagem" },
    { id: 5, nome: "Fernanda Rodrigues", horaChegada: "09:18", departamento: "Ortopedia" },
];

const Dashboard = () => {
    const [queue] = useState(initialQueue);

    // Estados para o modal de atendimento
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState<{ id: number; nome: string } | null>(null);
    const navigator = useNavigate();

    const handleNovoPaciente = () => {
        navigator("/cadastro-paciente");
    };

    const handleBuscarPaciente = () => {
        navigator("/buscar-paciente");
    };

    const handleLogout = () => {
        // TODO: Implementar logout
        console.log("Logout");
    };

    const handleSelecionarPaciente = (id: number, nome: string) => {
        setPacienteSelecionado({ id, nome });
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Cabeçalho */}

            {/* Conteúdo Principal */}
            <main className="container mx-auto px-6 py-8">
                {/* Botões de Ação Rápida */}
                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                        <Button
                            size="lg"
                            onClick={handleNovoPaciente}
                            className="h-20 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md"
                        >
                            <UserPlus className="h-6 w-6 mr-3" />
                            Cadastrar Novo Paciente
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleBuscarPaciente}
                            className="h-20 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-md"
                        >
                            <Search className="h-6 w-6 mr-3" />
                            Buscar Paciente Existente
                        </Button>
                    </div>
                </section>

                {/* Fila de Chegada */}
                <section>
                    <div className="bg-card rounded-lg border border-border shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-primary to-accent px-6 py-4">
                            <h2 className="text-xl font-bold text-primary-foreground">
                                Fila de Chegada
                            </h2>
                            <p className="text-sm text-primary-foreground/80 mt-1">
                                Pacientes aguardando atendimento
                            </p>
                        </div>

                        <div className="p-6">
                            {queue.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <p className="text-lg">Nenhum paciente na fila no momento</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-border">
                                            <TableHead className="font-semibold text-foreground">Nome do Paciente</TableHead>
                                            <TableHead className="font-semibold text-foreground">Hora da Chegada</TableHead>
                                            <TableHead className="font-semibold text-foreground">Departamento</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {queue.map((patient) => (
                                            <TableRow
                                                key={patient.id}
                                                onClick={() => handleSelecionarPaciente(patient.id, patient.nome)}
                                                className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                                            >
                                                <TableCell className="font-medium text-foreground">
                                                    {patient.nome}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {patient.horaChegada}
                                                </TableCell>
                                                <TableCell>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                            {patient.departamento}
                          </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal de Registrar Atendimento */}
            {pacienteSelecionado && (
                <RegistrarAtendimentoModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    pacienteNome={pacienteSelecionado.nome}
                    pacienteId={pacienteSelecionado.id}
                />
            )}
        </div>
    );
};

export default Dashboard;
