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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast.ts";
import SolicitarInternacaoModal from "../components/SolicitarInternacaoModal.tsx";
import RegistrarAltaMedicaModal from "../components/RegistrarAltaMedica.tsx";

// Dados do paciente (exemplo)
const pacienteAtual = {
    id: 1,
    nome: "Maria Silva Santos",
    idade: 45,
    genero: "Feminino",
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1979",
    alergias: ["Penicilina", "Dipirona"],
    convenio: "Unimed Premium",
    motivoVisita: "Dor no peito",
    horaChegada: "08:15",
};

// Histórico clínico (exemplo)
const historicoClinico = [
    {
        id: 1,
        tipo: "Consulta",
        data: "15/02/2025",
        profissional: "Dr. Roberto Almeida",
        departamento: "Cardiologia",
        resumo: "Paciente relatou episódios de taquicardia. ECG normal. Prescrito betabloqueador.",
        diagnostico: "Taquicardia sinusal",
    },
    {
        id: 2,
        tipo: "Exame",
        data: "10/01/2025",
        profissional: "Lab. Central",
        departamento: "Laboratório",
        resumo: "Hemograma completo. Glicemia em jejum: 95 mg/dL. Colesterol total: 210 mg/dL.",
        diagnostico: "Valores dentro da normalidade",
    },
    {
        id: 3,
        tipo: "Internação",
        data: "05/12/2024",
        profissional: "Dr. Ana Paula Costa",
        departamento: "UTI",
        resumo: "Internação por pneumonia bacteriana. 5 dias de antibioticoterapia intravenosa.",
        diagnostico: "Pneumonia adquirida na comunidade - recuperada",
    },
    {
        id: 4,
        tipo: "Consulta",
        data: "20/11/2024",
        profissional: "Dr. Carlos Mendes",
        departamento: "Clínica Geral",
        resumo: "Check-up de rotina. Pressão arterial: 130/85 mmHg. Solicitados exames laboratoriais.",
        diagnostico: "Hipertensão arterial controlada",
    },
];

const AtendimentoClinico = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [anamnese, setAnamnese] = useState("");
    const [evolucao, setEvolucao] = useState("");
    const [prescricao, setPrescricao] = useState("");
    const [exames, setExames] = useState("");
    const [modalInternacaoOpen, setModalInternacaoOpen] = useState(false);
    const [modalAltaMedicaOpen, setModalAltaMedicaOpen] = useState(false);

    const handleSolicitarInternacao = () => {
        setModalInternacaoOpen(true);
    };

    const handleFinalizarAtendimento = () => {
        if (!anamnese && !evolucao && !prescricao && !exames) {
            toast({
                title: "Atenção",
                description: "Preencha ao menos uma seção antes de finalizar.",
                variant: "destructive",
            });
            return;
        }

        // Abrir modal de alta médica
        setModalAltaMedicaOpen(true);
    };

    const handleConfirmarAlta = () => {
        toast({
            title: "Atendimento Finalizado",
            description: `Atendimento de ${pacienteAtual.nome} registrado com sucesso.`,
        });

        setTimeout(() => {
            navigate("/dashboard-profissional");
        }, 1500);
    };

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
            case "Exame":
                return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
            case "Internação":
                return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            {/* Cabeçalho */}
            <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/dashboard-profissional")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Voltar
                            </Button>
                            <Separator orientation="vertical" className="h-8" />
                            <div>
                                <h1 className="text-xl font-bold text-foreground">
                                    Atendimento Clínico
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {pacienteAtual.nome} • {pacienteAtual.motivoVisita}
                                </p>
                            </div>
                        </div>

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
            </header>

            {/* Layout de 3 Colunas */}
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
                                <p className="text-sm font-semibold text-foreground">{pacienteAtual.nome}</p>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Idade</p>
                                    <p className="text-sm font-medium text-foreground">{pacienteAtual.idade} anos</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Gênero</p>
                                    <p className="text-sm font-medium text-foreground">{pacienteAtual.genero}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">CPF</p>
                                <p className="text-sm font-medium text-foreground">{pacienteAtual.cpf}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Data de Nascimento</p>
                                <p className="text-sm font-medium text-foreground">{pacienteAtual.dataNascimento}</p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Convênio</p>
                                <p className="text-sm font-medium text-foreground">{pacienteAtual.convenio}</p>
                            </div>

                            <Separator />

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                    <p className="text-xs font-semibold text-destructive">Alergias</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {pacienteAtual.alergias.map((alergia, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-destructive/10 text-destructive border-destructive/30 text-xs"
                                        >
                                            {alergia}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">Chegada</p>
                                </div>
                                <p className="text-sm font-medium text-foreground">{pacienteAtual.horaChegada}</p>
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
                                <TabsList className="grid w-full grid-cols-4 mb-6">
                                    <TabsTrigger value="anamnese" className="text-sm">
                                        Anamnese
                                    </TabsTrigger>
                                    <TabsTrigger value="evolucao" className="text-sm">
                                        Evolução
                                    </TabsTrigger>
                                    <TabsTrigger value="prescricao" className="text-sm">
                                        Prescrição
                                    </TabsTrigger>
                                    <TabsTrigger value="exames" className="text-sm">
                                        Exames
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="anamnese" className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-2">
                                            História da Doença Atual
                                        </h3>
                                        <Textarea
                                            placeholder="Descreva a história da doença atual, sintomas principais, duração, evolução..."
                                            value={anamnese}
                                            onChange={(e) => setAnamnese(e.target.value)}
                                            className="min-h-[400px] resize-none text-sm"
                                        />
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
                                    {historicoClinico.map((item, index) => (
                                        <div key={item.id} className="relative animate-fade-in">
                                            {/* Linha vertical */}
                                            {index < historicoClinico.length - 1 && (
                                                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border" />
                                            )}

                                            <div className="flex gap-3">
                                                {/* Ícone do tipo */}
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${getTipoBadgeClass(item.tipo)}`}>
                                                    {getTipoIcon(item.tipo)}
                                                </div>

                                                {/* Conteúdo */}
                                                <div className="flex-1 pb-4">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <Badge variant="outline" className={`${getTipoBadgeClass(item.tipo)} text-xs`}>
                                                            {item.tipo}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{item.data}</span>
                                                    </div>

                                                    <h4 className="text-sm font-semibold text-foreground mt-2">
                                                        {item.diagnostico}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {item.profissional} • {item.departamento}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                                        {item.resumo}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* Modal de Solicitação de Internação */}
            <SolicitarInternacaoModal
                open={modalInternacaoOpen}
                onOpenChange={setModalInternacaoOpen}
                pacienteNome={pacienteAtual.nome}
            />

            {/* Modal de Registrar Alta Médica */}
            <RegistrarAltaMedicaModal
                open={modalAltaMedicaOpen}
                onOpenChange={setModalAltaMedicaOpen}
                pacienteNome={pacienteAtual.nome}
                onConfirmar={handleConfirmarAlta}
            />
        </div>
    );
};

export default AtendimentoClinico;
