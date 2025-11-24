import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext"; 
import hospitalLogo from "@/assets/vitalys.png";

type Departamento = {
    id: number;
    nome: string;
};

const CadastroUsuario = () => {
    // Campos de Pessoa
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [tipoUsuario, setTipoUsuario] = useState("");

    const [departamentoId, setDepartamentoId] = useState("");
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

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

        if (!nomeCompleto || !cpf || !dataNascimento || !email || !tipoUsuario || !senha || !confirmarSenha) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os dados pessoais e de login.",
                variant: "destructive",
            });
            return;
        }

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

        const payload: any = {
            nomeCompleto,
            cpf: cpf.replace(/\D/g, ""),
            dataNascimento,
            email,
            senha,
            tipoUsuario,
            telefone,
            endereco,
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
            toast({
                title: "Erro ao cadastrar",
                description: "Ocorreu um erro ao tentar criar o usuário.",
                variant: "destructive",
            });
        }
    };

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

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados Pessoais</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                                    <Input
                                        id="nomeCompleto"
                                        placeholder="Nome completo do colaborador"
                                        value={nomeCompleto}
                                        onChange={(e: any) => setNomeCompleto(e.target.value)}
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
                                        onChange={(e: any) => setDataNascimento(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone (Opcional)</Label>
                                    <Input
                                        id="telefone"
                                        placeholder="(00) 00000-0000"
                                        value={telefone}
                                        onChange={(e: any) => setTelefone(e.target.value)}
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

                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados de Acesso e Função</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipoUsuario">Tipo de Usuário *</Label>
                                    <Select value={tipoUsuario} onValueChange={(val: any) => {
                                        setTipoUsuario(val);
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