import {LogOut, UserPlus, Search, ArrowLeft, UserCircle} from "lucide-react";
import RegistrarAtendimentoModal from "@/components/RegistrarAtendimentoModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {  } from "lucide-react";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.ts";
import { PacienteListagemType } from "@/lib/Types.tsx";


// Dados de exemplo para a fila de chegada
const initialQueue = [
    { id: 1, nome: "Maria Silva Santos", horaChegada: "08:15", departamento: "Triagem" },
    { id: 2, nome: "João Pedro Oliveira", horaChegada: "08:32", departamento: "Cardiologia" },
    { id: 3, nome: "Ana Paula Costa", horaChegada: "08:47", departamento: "Pediatria" },
    { id: 4, nome: "Carlos Eduardo Mendes", horaChegada: "09:05", departamento: "Triagem" },
    { id: 5, nome: "Fernanda Rodrigues", horaChegada: "09:18", departamento: "Ortopedia" },
];

// onClick={() => handleSelecionarPaciente(patient.id, patient.nome)

const Dashboard = () => {
    const { toast } = useToast();
    const [busca, setBusca] = useState("");
    const [pacientes, setPacientes] = useState<Array<PacienteListagemType>>([])
    const [resultados, setResultados] = useState(pacientes);
    const [modalOpen, setModalOpen] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState<{ id: number; nome: string } | null>(null);
    const navigator = useNavigate();

    const handleNovoPaciente = () => {
        navigator("/cadastro-paciente");
    };

    const handleSelecionarPaciente = (id: number, nome: string) => {
        setPacienteSelecionado({ id, nome });
        setModalOpen(true);
    };

    async function buscarPacientes() {
        const response = await fetch("http://localhost:8080/api/pacientes");
        if (!response.ok) {
            toast({
                title: "Erro ao buscar pacientes.",
                description: "Verifique suas conexão e tente novamente.",
                variant: "destructive",
            });
        }
        const pacientes = await response.json();
        console.log("Pacientes buscados:", pacientes);
        setPacientes(pacientes);
        setResultados(pacientes);
    }

    const handleBusca = (valor: string) => {
        setBusca(valor);

        if (valor.trim() === "") {
            setResultados(pacientes);
            return;
        }

        const valorBusca = valor.toLowerCase();
        const filtrados = pacientes.filter(
            (paciente: any) =>
                paciente.nome.toLowerCase().includes(valorBusca) ||
                paciente.cpf.includes(valorBusca) ||
                paciente.matricula.toLowerCase().includes(valorBusca)
        );
        setResultados(filtrados);
    };

    useEffect(() => {
        buscarPacientes();
    }, [])

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
                    </div>
                </section>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Buscar Paciente Existente
                    </h1>
                    <p className="text-muted-foreground">
                        Pesquise por nome, CPF ou número de matrícula
                    </p>
                </div>

                {/* Campo de Busca */}
                <Card className="p-6 mb-6 shadow-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Digite o nome, CPF ou matrícula do paciente..."
                            value={busca}
                            onChange={(e) => handleBusca(e.target.value)}
                            className="pl-10 h-12 text-base"
                        />
                    </div>
                </Card>

                {/* Resultados da Busca */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground">
                        {resultados.length} {resultados.length === 1 ? "resultado encontrado" : "resultados encontrados"}
                    </h2>

                    {resultados.length === 0 ? (
                        <Card className="p-8 text-center">
                            <p className="text-muted-foreground">
                                Nenhum paciente encontrado. Tente outra busca.
                            </p>
                        </Card>
                    ) : (
                        resultados.map((paciente) => (
                            <Card
                                key={paciente.id}
                                className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary"
                                onClick={() => handleSelecionarPaciente(paciente.id, paciente.nome)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UserCircle className="h-7 w-7 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {paciente.nome}
                                            </h3>
                                            <div className="flex gap-4 text-sm text-muted-foreground">
                                                <span>CPF: {paciente.cpf}</span>
                                                <span>•</span>
                                                <span>Matrícula: {paciente.matricula}</span>
                                                <span>•</span>
                                                <span>Nascimento: {paciente.dataNascimento}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelecionarPaciente(paciente.id, paciente.nome);
                                        }}
                                    >
                                        Selecionar
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
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
