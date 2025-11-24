import { Button } from "../components/ui/button.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { Separator } from "../components/ui/separator.tsx";
import { ScrollArea } from "../components/ui/scroll-area.tsx";
import {
    UserCircle,
    Calendar,
    AlertCircle,
    ClipboardPlus,
    CheckCircle,
    ArrowLeft,
    Activity,
    FileText,
    Pill,
    FlaskConical
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../hooks/use-toast.ts";
import SolicitarInternacaoModal from "../components/SolicitarInternacaoModal.tsx";
import RegistrarAltaMedicaModal from "../components/RegistrarAltaMedica.tsx";

// Interface para os dados vindos do PacienteController
interface PacienteData {
    idPessoa: number;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    descricaoMedica: string;
}

const AtendimentoClinico = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();
    const [anamnese, setAnamnese] = useState("");
    const [evolucao, setEvolucao] = useState("");
    const [prescricao, setPrescricao] = useState("");
    const [exames, setExames] = useState("");
    const [atendimento, setAtendimento] = useState<any>(null);
    const [paciente, setPaciente] = useState<PacienteData | null>(null);
    const [modalAltaMedicaOpen, setModalAltaMedicaOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historicoClinico, setHistoricoClinico] = useState();


    useEffect(() => {
        console.log("idpoha", id);
        if (!id) return;

        const carregarDados = async () => {
            try {
                // 1. Busca o Atendimento para pegar o ID do Paciente
                const respAtendimento = await fetch(`http://localhost:8080/api/atendimentos/${id}`);
                if (!respAtendimento.ok) throw new Error("Erro ao buscar atendimento");
                const dadosAtendimento = await respAtendimento.json();
                console.log("dadosAtendimento", dadosAtendimento);
                setAtendimento(dadosAtendimento);

                // 2. Com o ID do Paciente, busca os dados detalhados no PacienteController
                if (dadosAtendimento.idPessoa) {
                    const respPaciente = await fetch(`http://localhost:8080/api/pacientes/${dadosAtendimento.idPessoa}`);
                    if (!respPaciente.ok) throw new Error("Erro ao buscar paciente");
                    const dadosPaciente: PacienteData = await respPaciente.json();
                    console.log("dadosPaciente", dadosPaciente);
                    setPaciente(dadosPaciente);

                    const respHistorico = await fetch(`http://localhost:8080/api/atendimentos/paciente/${dadosAtendimento.idPessoa}`);
                    if (!respHistorico.ok) throw new Error("Erro ao buscar paciente");
                    const dadosHistorico = await respHistorico.json();
                    console.log("dadosHistorico", dadosHistorico);
                    setHistoricoClinico(dadosHistorico);
                }

            } catch (error) {
                console.error(error);
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [id, toast]);

    const handleSalvarAnamnese = async () => {
        if (!id || !anamnese.trim()) {
            toast({ title: "Atenção", description: "O campo não pode estar vazio.", variant: "destructive" });
            return;
        }

        try {
            // ID do profissional fixo em 1 para teste (ou pegue do login se tiver)
            const profissionalId = window.localStorage.getItem("idUsuario");

            const response = await fetch(`http://localhost:8080/api/atendimentos/${id}/anotacoes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profissionalId: profissionalId,
                    textoAnotacao: anamnese
                })
            });

            if (!response.ok) throw new Error("Erro ao salvar");

            toast({
                title: "Sucesso",
                description: "Anamnese salva na tabela de Anotações Médicas.",
                variant: "default" // ou className="bg-green-500"
            });
            setAnamnese("");
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Falha ao salvar anotação.", variant: "destructive" });
        }
    };

    const handleFinalizarAtendimento = async () => {
        setModalAltaMedicaOpen(true);
    };

    const handleConfirmarAlta = async () => {
        const response = await fetch(`http://localhost:8080/api/atendimentos/${id}/finalizar`, {
            method: "PUT",
        })

        if (!response.ok) {
            toast({
                title: "Erro ao finalizar o atendimento!",
                description: "Verifique a sua conexão e tente novamente.",
                variant: "destructive",
            });
        }

        toast({
            title: "Atendimento Finalizado",
            description: `Atendimento de ${paciente?.nomeCompleto} registrado com sucesso.`,
        });

        setTimeout(() => {
            navigate("/dashboard-profissional");
        }, 1500);
    };

    async function handleSolicitarInternacao() {
        const response = await fetch(`http://localhost:8080/api/internacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pacienteId: paciente?.idPessoa,
                atendimentoId: atendimento?.idAtendimento,
                profissionalId: window.localStorage.getItem("idUsuario"),
                departamentoId: atendimento.idDepartamento
            })
        })

        if (!response.ok) {
            toast({
                title: "Erro ao soliciatar internação!",
                description: "Verifique a sua conexão e tente novamente.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Internação iniciada!",
            description: `Internação de ${paciente?.nomeCompleto} registrada com sucesso.`,
        });

        setTimeout(() => {
            navigate("/pacientes-internados");
        }, 1500);
    }

    const getTipoIcon = (tipo: string) => {
        switch (tipo) {
            case "Consulta":
                return <Activity className="h-4 w-4" />;
            case "Exame":
                return <FlaskConical className="h-4 w-4" />;
            case "Internação":
                return <ClipboardPlus className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getTipoBadgeClass = (tipo: string) => {
        switch (tipo) {
            case "Consulta":
                return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
            case "Internação":
                return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800";
        }
    };

    const calcularIdade = (dataNasc: string) => {
        if (!dataNasc) return "--";
        const hoje = new Date();
        const nasc = new Date(dataNasc);
        let idade = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
            idade--;
        }
        return idade;
    };

    if (!atendimento || !paciente) {
        return <div className="flex h-screen items-center justify-center">Dados não encontrados.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Cabeçalho */}

            {/* Layout de 3 Colunas */}
            <div className="px-6 py-6"> {/* px-6 já equivale a 1.5rem (24px) */}
                {/* Alterado de 'justify-between' para 'justify-end' */}
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/dashboard-profissional")}
                        className="text-muted-foreground hover:text-foreground justify-start"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleSolicitarInternacao}
                            className="h-10 px-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            <ClipboardPlus className="h-4 w-4 mr-2" />
                            Solicitar Internação
                        </Button>
                        <Button
                            onClick={handleFinalizarAtendimento}
                            className="h-10 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Finalizar Atendimento
                        </Button>
                    </div>
                </div>
            </div>

            <main className="p-6 grid grid-cols-12 gap-6">
                {/* Coluna Esquerda - Resumo do Paciente (Fixa) */}
                <aside className="col-span-12 lg:col-span-3">
                    <Card className="shadow-md sticky top-24">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border pb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <UserCircle className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Dados do Paciente</CardTitle>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Informações principais
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Nome Completo</p>
                                <p className="text-sm font-semibold text-foreground">{paciente.nomeCompleto}</p>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Idade</p>
                                    <p className="text-sm font-medium text-foreground">
                                        {calcularIdade(paciente.dataNascimento)} anos
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">CPF</p>
                                <p className="text-sm font-medium text-foreground">{paciente.cpf}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Data de Nascimento</p>
                                <p className="text-sm font-medium text-foreground">
                                    {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                                </p>
                            </div>


                            <Separator />

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                    <p className="text-xs font-semibold text-destructive">{paciente.descricaoMedica}</p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </aside>

                {/* Coluna Central - Ficha do Atendimento Atual */}
                <section className="col-span-12 lg:col-span-6">
                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Ficha de Atendimento Atual
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Registre as informações clínicas do atendimento
                            </p>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Tabs defaultValue="anamnese" className="w-full">
                                <TabsContent value="anamnese" className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-2">
                                            Adicione uma anotação médica:
                                        </h3>
                                        <Textarea
                                            placeholder="Descreva a história da doença atual, sintomas principais, duração, evolução..."
                                            value={anamnese}
                                            onChange={(e) => setAnamnese(e.target.value)}
                                            className="min-h-[400px] resize-none text-sm"
                                        />

                                        <div className="flex justify-end py-4">
                                            <Button
                                                onClick={handleSalvarAnamnese}
                                                className="bg-primary hover:bg-primary/90 text-white font-bold"
                                            >
                                                Adicionar anotação
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="evolucao" className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-2">
                                            Evolução Clínica
                                        </h3>
                                        <Textarea
                                            placeholder="Registre a evolução do quadro clínico, exame físico, sinais vitais, conduta..."
                                            value={evolucao}
                                            onChange={(e) => setEvolucao(e.target.value)}
                                            className="min-h-[400px] resize-none text-sm"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="prescricao" className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                            <Pill className="h-4 w-4 text-primary" />
                                            Prescrição Médica
                                        </h3>
                                        <Textarea
                                            placeholder="Liste os medicamentos prescritos com posologia, via de administração e duração do tratamento..."
                                            value={prescricao}
                                            onChange={(e) => setPrescricao(e.target.value)}
                                            className="min-h-[400px] resize-none text-sm font-mono"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="exames" className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                            <FlaskConical className="h-4 w-4 text-primary" />
                                            Solicitação de Exames
                                        </h3>
                                        <Textarea
                                            placeholder="Liste os exames solicitados (laboratoriais, imagem, etc.) com justificativa clínica..."
                                            value={exames}
                                            onChange={(e) => setExames(e.target.value)}
                                            className="min-h-[400px] resize-none text-sm"
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </section>

                {/* Coluna Direita - Histórico Clínico */}
                <aside className="col-span-12 lg:col-span-3">
                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border pb-4">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Histórico Clínico
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                                Timeline de atendimentos anteriores
                            </p>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-250px)]">
                                <div className="p-4 space-y-4">
                                    {historicoClinico && historicoClinico.map((historico: any, index: number) => {
                                        // 1. Extração dos objetos principais
                                        const { atendimento, internacao } = historico;

                                        // 2. Determinar se é Internação ou Consulta/Atendimento
                                        // Se o objeto 'internacao' existir e não for null, consideramos Internação
                                        const isInternacao = !!internacao;
                                        const tipo = isInternacao ? "Internação" : "Consulta";

                                        // 3. Normalização dos dados para exibição
                                        const dataEvento = isInternacao
                                            ? internacao.dataEntrada
                                            : atendimento.dataHora;

                                        const motivo = atendimento.motivo || "Sem motivo registrado";

                                        // Pega o profissional da internação se houver, senão do atendimento
                                        const profissionalNome = isInternacao
                                            ? internacao.profissional?.nomeCompleto
                                            : atendimento.profissional?.nomeCompleto;

                                        const departamentoNome = isInternacao
                                            ? internacao.departamento?.nome
                                            : atendimento.departamento?.nome;

                                        // Formatação de data simples (ajuste conforme seu helper formatDate)
                                        const dataFormatada = new Date(dataEvento).toLocaleDateString('pt-BR', {
                                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        });

                                        return (
                                            <div key={atendimento.idAtendimento} className="relative animate-fade-in">
                                                {/* Linha vertical de conexão */}
                                                {index < historicoClinico.length - 1 && (
                                                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border" />
                                                )}

                                                <div className="flex gap-3">
                                                    {/* Ícone do tipo */}
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${getTipoBadgeClass(tipo)}`}>
                                                        {getTipoIcon(tipo)}
                                                    </div>

                                                    {/* Conteúdo */}
                                                    <div className="flex-1 pb-4">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <Badge variant="outline" className={`${getTipoBadgeClass(tipo)} text-xs`}>
                                                                {tipo}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground capitalize">
                                    {dataFormatada}
                                </span>
                                                        </div>

                                                        <h4 className="text-sm font-semibold text-foreground mt-2">
                                                            {motivo}
                                                        </h4>

                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {profissionalNome || "Profissional N/A"} • {departamentoNome || "Geral"}
                                                        </p>

                                                        {/* Exibe anotações ou evoluções se quiser um resumo */}
                                                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                                                            {isInternacao
                                                                ? `Status: ${internacao.status}`
                                                                : `Status: ${atendimento.status}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* Modal de Registrar Alta Médica */}
            <RegistrarAltaMedicaModal
                open={modalAltaMedicaOpen}
                onOpenChange={setModalAltaMedicaOpen}
                pacienteNome={paciente.nomeCompleto}
                onConfirmar={handleConfirmarAlta}
                atendimentoId={atendimento.idAtendimento}
            />
        </div>
    );
};

export default AtendimentoClinico;
