import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { useToast } from "../hooks/use-toast.ts";
import hospitalLogo from "@/assets/vitalys.png";
import {useAuth} from "../contexts/AuthContext.tsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const {login, isAuthenticated} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            toast({
                title: "Campos obrigatórios",
                description: "Por favor, preencha usuário e senha.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            console.log("Enviando dados de login:", { email, senha });
            const response = await login(email, senha);
            toast({
                title: "Login realizado",
                description: `Bem-vindo ao Vitalys, ${response.nome}!`,
            });

            setIsLoading(false);

            if (response.tipoUsuario === "RECEPCIONISTA") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard-profissional");
            }

        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Erro ao fazer login",
                description: "Verifique suas credenciais e tente novamente.",
                variant: "destructive",
            });
            return
        }

        // Simular autenticação
        // setTimeout(() => {
        //     toast({
        //         title: "Login realizado",
        //         description: "Bem-vindo ao Sistema de Gestão Hospitalar!",
        //     });
        //     setIsLoading(false);
        //     // Navegar para o dashboard
        //     navigate("/dashboard");
        // }, 1500);
    };

    return !isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-background p-4">
            <Card className="w-full max-w-md shadow-strong">
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
                            Sistema de Gestão Hospitalar
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            Entre com suas credenciais para acessar o sistema
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="usuario" className="text-foreground font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Digite seu usuário ou matrícula"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="senha" className="text-foreground font-medium">
                                Senha
                            </Label>
                            <Input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="h-11 bg-background border-border focus-visible:ring-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity font-semibold text-base shadow-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>

                        <div className="text-center pt-2">
              <span className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
              </span>
                            <a
                                href="/cadastro-usuario"
                                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Cadastre-se aqui
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

export default Login;
