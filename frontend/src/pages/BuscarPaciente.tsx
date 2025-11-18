import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ArrowLeft, UserCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dados de exemplo - pacientes cadastrados
const pacientesCadastrados = [
    { id: 1, nome: "Maria Silva Santos", cpf: "123.456.789-00", matricula: "P001", dataNascimento: "15/03/1985" },
    { id: 2, nome: "João Pedro Oliveira", cpf: "234.567.890-11", matricula: "P002", dataNascimento: "22/07/1992" },
    { id: 3, nome: "Ana Paula Costa", cpf: "345.678.901-22", matricula: "P003", dataNascimento: "10/12/1978" },
    { id: 4, nome: "Carlos Eduardo Mendes", cpf: "456.789.012-33", matricula: "P004", dataNascimento: "05/09/1988" },
    { id: 5, nome: "Fernanda Rodrigues", cpf: "567.890.123-44", matricula: "P005", dataNascimento: "18/04/1995" },
];

const BuscarPaciente = () => {
    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState(pacientesCadastrados);

    const handleBusca = (valor: string) => {
        setBusca(valor);

        if (valor.trim() === "") {
            setResultados(pacientesCadastrados);
            return;
        }

        const valorBusca = valor.toLowerCase();
        const filtrados = pacientesCadastrados.filter(
            (paciente) =>
                paciente.nome.toLowerCase().includes(valorBusca) ||
                paciente.cpf.includes(valorBusca) ||
                paciente.matricula.toLowerCase().includes(valorBusca)
        );
        setResultados(filtrados);
    };

    const handleSelecionarPaciente = (paciente: typeof pacientesCadastrados[0]) => {
        // Redirecionar para cadastro de paciente com os dados preenchidos
        navigate("/cadastro-paciente", { state: { paciente } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Cabeçalho */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/dashboard")}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar ao Dashboard
                        </Button>
                        <img
                            src="/src/assets/hospital-logo.png"
                            alt="Hospital Logo"
                            className="h-10 w-auto ml-4"
                        />
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="container mx-auto px-6 py-8 max-w-5xl">
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
                                onClick={() => handleSelecionarPaciente(paciente)}
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
                                            handleSelecionarPaciente(paciente);
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
        </div>
    );
};

export default BuscarPaciente;
