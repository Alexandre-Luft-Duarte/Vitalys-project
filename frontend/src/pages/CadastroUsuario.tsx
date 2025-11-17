import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import hospitalLogo from "@/assets/vitalys.png";

const CadastroUsuario = () => {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [matricula, setMatricula] = useState("");
    const [cargo, setCargo] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nomeCompleto || !email || !matricula || !cargo || !senha || !confirmarSenha) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os campos.",
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

        // Simular cadastro
        setTimeout(() => {
            toast({
                title: "Cadastro realizado",
                description: "Sua conta foi criada com sucesso! Redirecionando...",
            });
            setIsLoading(false);
            // Redirecionar para login após cadastro
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-background p-4">
            <Card className="w-full max-w-md shadow-strong">
                <CardHeader className="space-y-4 text-center pb-6">
                    <div className="flex justify-center mb-2">
                        <img
                            src={hospitalLogo}
                            alt="Logo do Hospital"
                            className="h-20 w-20 object-contain"
                        />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            Crie sua Conta de Colaborador
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            Preencha os dados para criar sua conta no sistema
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nomeCompleto" className="text-foreground font-medium">
                                Nome Completo
                            </Label>
                            <Input
                                id="nomeCompleto"
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground font-medium">
                                E-mail Corporativo
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu.email@hospital.com.br"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="matricula" className="text-foreground font-medium">
                                Matrícula
                            </Label>
                            <Input
                                id="matricula"
                                type="text"
                                placeholder="Digite sua matrícula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cargo" className="text-foreground font-medium">
                                Cargo/Função
                            </Label>
                            <Select value={cargo} onValueChange={setCargo} disabled={isLoading}>
                                <SelectTrigger className="h-11 bg-background border-border focus:ring-primary">
                                    <SelectValue placeholder="Selecione seu cargo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recepcao">Recepção</SelectItem>
                                    <SelectItem value="enfermagem">Enfermagem</SelectItem>
                                    <SelectItem value="medico">Médico</SelectItem>
                                    <SelectItem value="gestor">Gestor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="senha" className="text-foreground font-medium">
                                Criar Senha
                            </Label>
                            <Input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha (mínimo 6 caracteres)"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmarSenha" className="text-foreground font-medium">
                                Confirmar Senha
                            </Label>
                            <Input
                                id="confirmarSenha"
                                type="password"
                                placeholder="Digite sua senha novamente"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity font-semibold text-base shadow-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </Button>

                        <div className="text-center pt-2">
              <span className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
              </span>
                            <a
                                href="/"
                                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Faça o login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CadastroUsuario;
