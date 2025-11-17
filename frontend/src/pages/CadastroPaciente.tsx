import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { ArrowLeft } from "lucide-react";
import { useToast } from "../hooks/use-toast.ts";

// Schema de validação
const cadastroSchema = z.object({
    // Dados Pessoais
    nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (formato: 000.000.000-00)"),
    dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    genero: z.string().min(1, "Selecione o gênero"),

    // Informações de Contato
    telefone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido (formato: (00) 00000-0000)"),
    email: z.string().email("E-mail inválido").max(255, "E-mail muito longo"),

    // Endereço
    cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido (formato: 00000-000)"),
    rua: z.string().trim().min(3, "Rua é obrigatória").max(200, "Rua muito longa"),
    numero: z.string().trim().min(1, "Número é obrigatório").max(10, "Número muito longo"),
    bairro: z.string().trim().min(2, "Bairro é obrigatório").max(100, "Bairro muito longo"),
    cidade: z.string().trim().min(2, "Cidade é obrigatória").max(100, "Cidade muito longa"),
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

const CadastroPaciente = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CadastroFormData>({
        resolver: zodResolver(cadastroSchema),
    });

    // Máscaras de formatação
    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const formatTelefone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4,5})(\d{4})/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    };

    const formatCEP = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
    };

    const onSubmit = async (data: CadastroFormData) => {
        setIsSubmitting(true);

        // Simular salvamento
        setTimeout(() => {
            console.log("Dados do paciente:", data);
            toast({
                title: "Paciente cadastrado com sucesso!",
                description: `${data.nome} foi adicionado ao sistema.`,
            });
            setIsSubmitting(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Cabeçalho */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Dashboard
                    </Button>

                    <h1 className="text-3xl font-bold text-foreground">Cadastro de Paciente</h1>
                    <p className="text-muted-foreground mt-2">
                        Preencha todos os campos para cadastrar um novo paciente no sistema
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Seção: Dados Pessoais */}
                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Dados Pessoais</CardTitle>
                            <CardDescription>Informações básicas do paciente</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome" className="text-foreground font-medium">
                                    Nome Completo <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="nome"
                                    placeholder="Digite o nome completo"
                                    {...register("nome")}
                                    className="h-11"
                                />
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf" className="text-foreground font-medium">
                                        CPF <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        {...register("cpf")}
                                        onChange={(e) => {
                                            const formatted = formatCPF(e.target.value);
                                            e.target.value = formatted;
                                            setValue("cpf", formatted);
                                        }}
                                        maxLength={14}
                                        className="h-11"
                                    />
                                    {errors.cpf && (
                                        <p className="text-sm text-destructive">{errors.cpf.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dataNascimento" className="text-foreground font-medium">
                                        Data de Nascimento <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="dataNascimento"
                                        type="date"
                                        {...register("dataNascimento")}
                                        className="h-11"
                                    />
                                    {errors.dataNascimento && (
                                        <p className="text-sm text-destructive">{errors.dataNascimento.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="genero" className="text-foreground font-medium">
                                    Gênero <span className="text-destructive">*</span>
                                </Label>
                                <Select onValueChange={(value) => setValue("genero", value)}>
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Selecione o gênero" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="masculino">Masculino</SelectItem>
                                        <SelectItem value="feminino">Feminino</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                        <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.genero && (
                                    <p className="text-sm text-destructive">{errors.genero.message}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seção: Informações de Contato */}
                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Informações de Contato</CardTitle>
                            <CardDescription>Como podemos entrar em contato</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="telefone" className="text-foreground font-medium">
                                        Telefone <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="telefone"
                                        placeholder="(00) 00000-0000"
                                        {...register("telefone")}
                                        onChange={(e) => {
                                            const formatted = formatTelefone(e.target.value);
                                            e.target.value = formatted;
                                            setValue("telefone", formatted);
                                        }}
                                        maxLength={15}
                                        className="h-11"
                                    />
                                    {errors.telefone && (
                                        <p className="text-sm text-destructive">{errors.telefone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground font-medium">
                                        E-mail <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemplo@email.com"
                                        {...register("email")}
                                        className="h-11"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seção: Endereço */}
                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Endereço</CardTitle>
                            <CardDescription>Localização do paciente</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="cep" className="text-foreground font-medium">
                                        CEP <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="cep"
                                        placeholder="00000-000"
                                        {...register("cep")}
                                        onChange={(e) => {
                                            const formatted = formatCEP(e.target.value);
                                            e.target.value = formatted;
                                            setValue("cep", formatted);
                                        }}
                                        maxLength={9}
                                        className="h-11"
                                    />
                                    {errors.cep && (
                                        <p className="text-sm text-destructive">{errors.cep.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2 md:col-span-3">
                                    <Label htmlFor="rua" className="text-foreground font-medium">
                                        Rua <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="rua"
                                        placeholder="Nome da rua"
                                        {...register("rua")}
                                        className="h-11"
                                    />
                                    {errors.rua && (
                                        <p className="text-sm text-destructive">{errors.rua.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="numero" className="text-foreground font-medium">
                                        Número <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="numero"
                                        placeholder="Nº"
                                        {...register("numero")}
                                        className="h-11"
                                    />
                                    {errors.numero && (
                                        <p className="text-sm text-destructive">{errors.numero.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bairro" className="text-foreground font-medium">
                                        Bairro <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="bairro"
                                        placeholder="Nome do bairro"
                                        {...register("bairro")}
                                        className="h-11"
                                    />
                                    {errors.bairro && (
                                        <p className="text-sm text-destructive">{errors.bairro.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cidade" className="text-foreground font-medium">
                                        Cidade <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="cidade"
                                        placeholder="Nome da cidade"
                                        {...register("cidade")}
                                        className="h-11"
                                    />
                                    {errors.cidade && (
                                        <p className="text-sm text-destructive">{errors.cidade.message}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Botão de Salvar */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/dashboard")}
                            disabled={isSubmitting}
                            className="h-12 px-8"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold text-base shadow-medium"
                        >
                            {isSubmitting ? "Salvando..." : "Salvar Cadastro"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroPaciente;
