import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CadastroPacienteType } from "@/lib/types.ts";
import {UFS} from "@/lib/constants.ts"

const cadastroSchema = z.object({
    nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
    cpf: z.string().min(14, "CPF inválido").regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),

    descricaoMedica: z.string().optional(),

    // 3. Endereço (Regra Condicional)
    cep: z.string().optional(),
    rua: z.string().optional(),
    numero: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.rua && data.rua.trim().length > 0) {
        if (!data.cidade || data.cidade.trim().length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Cidade é obrigatória ao informar endereço",
                path: ["cidade"],
            });
        }
        if (!data.estado) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Estado é obrigatório ao informar endereço",
                path: ["estado"],
            });
        }
    }
    if (data.telefone && data.telefone.length > 0 && data.telefone.length < 14) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Telefone incompleto",
            path: ["telefone"],
        });
    }
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
        watch,
        formState: { errors },
    } = useForm<CadastroFormData>({
        resolver: zodResolver(cadastroSchema),
        defaultValues: {
            estado: "",
        }
    });

    // --- MÁSCARAS ---
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

        const payload: CadastroPacienteType = {
            nomeCompleto: data.nome,
            cpf: data.cpf.replace(/\D/g, ""),
            dataNascimento: data.dataNascimento,

            ...(data.descricaoMedica && { descricaoMedica: data.descricaoMedica }),

            contato: {
                ...(data.telefone && { telefone: data.telefone.replace(/\D/g, "") }),
            },

            ...(data.rua ? {
                endereco: {
                    cep: data.cep?.replace(/\D/g, ""),
                    logradouro: data.rua,
                    numero: data.numero,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    estado: data.estado
                }
            } : {})
        };

        console.log("Enviando:", payload);

        const response = await fetch("http://localhost:8080/api/pacientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            setIsSubmitting(false);
            toast({
                title: "Erro ao cadastrar paciente",
                description: "Por favor, tente novamente mais tarde.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Paciente cadastrado com sucesso!",
                description: `${data.nome} foi adicionado ao sistema.`,
            });
            setIsSubmitting(false);
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">

            <div className="container mx-auto px-6 max-w-4xl py-8">
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
                        Preencha todos os campos obrigatórios para cadastrar um novo paciente.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Dados Pessoais</CardTitle>
                            <CardDescription>Informações principais do paciente</CardDescription>
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
                                {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cpf" className="text-foreground font-medium">
                                        CPF <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        {...register("cpf")}
                                        onChange={(e) => setValue("cpf", formatCPF(e.target.value))}
                                        maxLength={14}
                                        className="h-11"
                                    />
                                    {errors.cpf && <p className="text-sm text-destructive">{errors.cpf.message}</p>}
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
                                    {errors.dataNascimento && <p className="text-sm text-destructive">{errors.dataNascimento.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telefone" className="text-foreground font-medium">
                                        Telefone
                                    </Label>
                                    <Input
                                        id="telefone"
                                        placeholder="(00) 00000-0000"
                                        {...register("telefone")}
                                        onChange={(e) => setValue("telefone", formatTelefone(e.target.value))}
                                        maxLength={15}
                                        className="h-11"
                                    />
                                    {errors.telefone && <p className="text-sm text-destructive">{errors.telefone.message}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Dados Clínicos</CardTitle>
                            <CardDescription>Histórico e observações iniciais (Opcional)</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="descricaoMedica" className="text-foreground font-medium">
                                    Descrição Médica / Observações
                                </Label>
                                <Textarea
                                    id="descricaoMedica"
                                    placeholder="Alergias, doenças crônicas, observações..."
                                    {...register("descricaoMedica")}
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                            <CardTitle className="text-xl text-foreground">Endereço</CardTitle>
                            <CardDescription>Preencher a rua torna Cidade e Estado obrigatórios</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="cep" className="text-foreground font-medium">
                                        CEP
                                    </Label>
                                    <Input
                                        id="cep"
                                        placeholder="00000-000"
                                        {...register("cep")}
                                        onChange={(e) => setValue("cep", formatCEP(e.target.value))}
                                        maxLength={9}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2 md:col-span-3">
                                    <Label htmlFor="rua" className="text-foreground font-medium">
                                        Rua
                                    </Label>
                                    <Input
                                        id="rua"
                                        placeholder="Nome da rua"
                                        {...register("rua")}
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="numero" className="text-foreground font-medium">
                                        Número
                                    </Label>
                                    <Input
                                        id="numero"
                                        placeholder="Nº"
                                        {...register("numero")}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bairro" className="text-foreground font-medium">
                                        Bairro
                                    </Label>
                                    <Input
                                        id="bairro"
                                        placeholder="Nome do bairro"
                                        {...register("bairro")}
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cidade" className="text-foreground font-medium">
                                        Cidade {watch("rua") && <span className="text-destructive">*</span>}
                                    </Label>
                                    <Input
                                        id="cidade"
                                        placeholder="Nome da cidade"
                                        {...register("cidade")}
                                        className="h-11"
                                    />
                                    {errors.cidade && <p className="text-sm text-destructive">{errors.cidade.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="estado" className="text-foreground font-medium">
                                        Estado (UF) {watch("rua") && <span className="text-destructive">*</span>}
                                    </Label>
                                    <Select onValueChange={(val) => setValue("estado", val)}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="UF" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {UFS.map((uf) => (
                                                <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.estado && <p className="text-sm text-destructive">{errors.estado.message}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
                            {isSubmitting ? "Salvando..." : "Salvar Paciente"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroPaciente;