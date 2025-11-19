import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import hospitalLogo from "@/assets/vitalys.png";
import { useAuth } from "../contexts/AuthContext.tsx";
import { CadastroType } from "@/lib/Types"

const CadastroUsuario = () => {
    // Campos de Pessoa
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    // Campos de Usuário e Login
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Campos de Controle de Tipo (Herança)
    const [tipoUsuario, setTipoUsuario] = useState(""); // "RECEPCIONISTA" ou "PROFISSIONAL"

    // Campos Específicos de Profissional
    const [especialidadeId, setEspecialidadeId] = useState("");

    // Campos Opcionais (Contato/Endereço)
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { isAuthenticated, cadastro } = useAuth();

    // Função auxiliar para formatar CPF visualmente
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

        // 1. Validação dos Campos Obrigatórios (Pessoa e Usuário)
        if (!nomeCompleto || !cpf || !dataNascimento || !email || !tipoUsuario || !senha || !confirmarSenha) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os dados pessoais e de login.",
                variant: "destructive",
            });
            return;
        }

        // 2. Validação Específica de Profissional
        if (tipoUsuario === "PROFISSIONAL" && !especialidadeId) {
            toast({
                title: "Campo obrigatório",
                description: "Profissionais de saúde precisam informar o ID da Especialidade.",
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

        // 3. Montagem do Objeto para o Backend (Exemplo de estrutura JOINED)
        const payload: CadastroType = {
            nomeCompleto,
            cpf: cpf.replace(/\D/g, ""), // Enviar apenas números
            dataNascimento, // Formato YYYY-MM-DD
            email,
            senha,
            tipoUsuario, // Backend usa isso para instanciar a classe certa
            telefone,
            endereco,
            // Se for profissional, anexa a especialidade
            ...(tipoUsuario === "PROFISSIONAL" && { especialidadeId: Number(especialidadeId) })
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
                title: "Erro ao fazer login",
                description: "Verifique suas credenciais e tente novamente.",
                variant: "destructive",
            });
            return
        }
    };

    return !isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-background p-4 py-8">
            <Card className="w-full max-w-2xl shadow-strong"> {/* Aumentei max-w para caber melhor os campos */}
                <CardHeader className="space-y-4 text-center pb-6">
                    <div className="flex justify-center mb-2">
                        <img
                            src={hospitalLogo}
                            alt="Logo do Hospital"
                            className="h-20 w-40 object-contain"
                        />
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

                        {/* SEÇÃO: DADOS PESSOAIS (Classe Pessoa) */}
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

                        {/* SEÇÃO: DADOS DO SISTEMA (Classe Usuario e Filhas) */}
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados de Acesso e Função</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tipoUsuario">Tipo de Usuário *</Label>
                                    <Select value={tipoUsuario} onValueChange={setTipoUsuario} disabled={isLoading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a função" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="RECEPCIONISTA">Recepção</SelectItem>
                                            <SelectItem value="PROFISSIONAL">Profissional de Saúde (Médico/Enfermeiro)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Campo Condicional: Só aparece se for PROFISSIONAL */}
                                {tipoUsuario === "PROFISSIONAL" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="especialidadeId">ID da Especialidade *</Label>
                                        <Input
                                            id="especialidadeId"
                                            type="number"
                                            placeholder="Ex: 1 (Cardiologia)"
                                            value={especialidadeId}
                                            onChange={(e) => setEspecialidadeId(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <p className="text-[0.8rem] text-muted-foreground">
                                            Insira o ID da especialidade médica.
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