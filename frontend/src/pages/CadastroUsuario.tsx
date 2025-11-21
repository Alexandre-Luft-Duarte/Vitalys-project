import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext"; // Ajustado import para usar alias e remover extensão .tsx
import hospitalLogo from "@/assets/vitalys.png";

// Tipo auxiliar para o departamento
type Departamento = {
    id: number;
    nome: string;
};

const CadastroUsuario = () => {
    // Campos de Pessoa
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    // Campos de Usuário e Login
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Campos de Controle de Tipo
    const [tipoUsuario, setTipoUsuario] = useState("");

    // NOVO: Campos para Departamento (Substitui Especialidade)
    const [departamentoId, setDepartamentoId] = useState("");
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    // Campos Opcionais
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { isAuthenticated, cadastro } = useAuth();


    const fetchDepartamentos = async () => {
        const response = await fetch("http://localhost:8080/api/departamentos");
        if (!response.ok) {
            toast({
                title: "Aviso",
                description: "Não foi possível buscar departamentos, verifique sua conexão e tente novamente.",
                variant: "destructive",
            });
        }
        const data = await response.json();
        setDepartamentos(data);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validação Básica
        if (!nomeCompleto || !cpf || !dataNascimento || !email || !tipoUsuario || !senha || !confirmarSenha) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os dados pessoais e de login.",
                variant: "destructive",
            });
            return;
        }

        // 2. Validação Específica (Agora valida Departamento)
        if (tipoUsuario === "PROFISSIONAL" && !departamentoId) {
            toast({
                title: "Campo obrigatório",
                description: "Selecione o departamento do profissional.",
                variant: "destructive",
            });
            return;
        }

        if (senha !== confirmarSenha) {
            toast({
                title: "Senhas não conferem",
                description: "As senhas digitadas não são iguais.",
                variant: "destructive",
            });
            return;
        }

        if (senha.length < 6) {
            toast({
                title: "Senha muito curta",
                description: "A senha deve ter no mínimo 6 caracteres.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        // 3. Montagem do Payload
        const payload: any = {
            nomeCompleto,
            cpf: cpf.replace(/\D/g, ""),
            dataNascimento,
            email,
            senha,
            tipoUsuario,
            telefone,
            endereco,
            // Envia o ID do departamento se for profissional
            ...(tipoUsuario === "PROFISSIONAL" && { departamentoId: Number(departamentoId) })
        };

        try {
            console.log("Enviando dados de cadastro:", payload);
            await cadastro(payload);
            toast({
                title: "Cadastro realizado",
                description: `Usuário criado com sucesso! Redirecionando...`,
            });
            setIsLoading(false);
            navigate("/login");
        } catch (error) {
            setIsLoading(false);
            // O erro é tratado, mas mantemos o toast por segurança
            toast({
                title: "Erro ao cadastrar",
                description: "Ocorreu um erro ao tentar criar o usuário.",
                variant: "destructive",
            });
        }
    };

    // --- EFEITO: Busca Departamentos quando seleciona PROFISSIONAL ---
    useEffect(() => {
        if (tipoUsuario === "PROFISSIONAL") {
            fetchDepartamentos();
        }
    }, [tipoUsuario, toast]);

    return !isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-background p-4 py-8">
            <Card className="w-full max-w-2xl shadow-strong">
                <CardHeader className="space-y-4 text-center pb-6">
                    <div className="flex justify-center mb-2">
                        {/* Substituído imagem por ícone para evitar erro de importação */}
                        <div className="flex justify-center mb-2">
                            <img
                                src={hospitalLogo}
                                alt="Logo do Hospital"
                                className="h-20 w-40 object-contain"
                            />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            Novo Colaborador
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            Preencha os dados para cadastrar um Profissional ou Recepcionista
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* DADOS PESSOAIS */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados Pessoais</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                                    <Input
                                        id="nomeCompleto"
                                        placeholder="Nome completo do colaborador"
                                        value={nomeCompleto}
                                        onChange={(e) => setNomeCompleto(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF *</Label>
                                    <Input
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        value={cpf}
                                        onChange={handleCpfChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                                    <Input
                                        id="dataNascimento"
                                        type="date"
                                        value={dataNascimento}
                                        onChange={(e) => setDataNascimento(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone (Opcional)</Label>
                                    <Input
                                        id="telefone"
                                        placeholder="(00) 00000-0000"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endereco">Endereço Completo (Opcional)</Label>
                                <Input
                                    id="endereco"
                                    placeholder="Rua, Número, Bairro"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* DADOS DO SISTEMA */}
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados de Acesso e Função</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipoUsuario">Tipo de Usuário *</Label>
                                    <Select value={tipoUsuario} onValueChange={(val) => {
                                        setTipoUsuario(val);
                                        // Limpa o departamento se mudar de tipo
                                        if (val !== "PROFISSIONAL") setDepartamentoId("");
                                    }} disabled={isLoading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a função" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="RECEPCIONISTA">Recepção</SelectItem>
                                            <SelectItem value="PROFISSIONAL">Profissional de Saúde</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Campo Condicional: SELECT DE DEPARTAMENTOS */}
                                {tipoUsuario === "PROFISSIONAL" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="departamentoId">Departamento *</Label>
                                        <Select value={departamentoId} onValueChange={setDepartamentoId} disabled={isLoading}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o departamento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departamentos.length === 0 ? (
                                                    <SelectItem value="0" disabled>Carregando departamentos...</SelectItem>
                                                ) : (
                                                    departamentos.map((dep) => (
                                                        <SelectItem key={dep.idDepartamento} value={String(dep.idDepartamento)}>
                                                            {dep.nome}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-[0.8rem] text-muted-foreground">
                                            Vincule o profissional a um departamento.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail de Login *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="usuario@vitalys.com.br"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="senha">Senha *</Label>
                                    <Input
                                        id="senha"
                                        type="password"
                                        placeholder="Mínimo 6 caracteres"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                                    <Input
                                        id="confirmarSenha"
                                        type="password"
                                        placeholder="Repita a senha"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity font-semibold text-base shadow-medium mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processando..." : "Cadastrar Colaborador"}
                        </Button>

                        <div className="text-center pt-2">
                            <span className="text-sm text-muted-foreground">
                                Já tem uma conta?{" "}
                            </span>
                            <a href="/" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                                Ir para Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    ) : (
        <Navigate to="/dashboard" />
    );
};

export default CadastroUsuario;