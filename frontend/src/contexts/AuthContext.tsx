import {useState, createContext, useContext, useEffect} from "react";
import { AuthContextType, CadastroType}  from "@/lib/Types";

const InternalContext = createContext<AuthContextType>(false as unknown as AuthContextType);

export function AuthContext({ children } : { children: React.ReactNode }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const nome: string = window.localStorage.getItem("nome") || "User";

    async function login(email: string, senha: string) {
        const response = await fetch("http://localhost:8080/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        })

        console.log("response", response)

        if (!response.ok) {
            throw new Error("Erro ao fazer login");
        }

        const data = await response.json();
        window.localStorage.setItem("nome", data.nome);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("tipoUsuario", data.tipoUsuario);
        setIsAuthenticated(true);
        return data;
    }

    async function cadastro(dados: CadastroType) {
        const response = await fetch("http://localhost:8080/api/usuarios/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        console.log("response", response)

        if (!response.ok) {
            throw new Error("Erro ao fazer cadastro!");
        }
    }

    async function logout() {
        setIsAuthenticated(false);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("nome");
        window.localStorage.removeItem("tipoUsuario");
    }

    useEffect(() => {
        console.log("useEffect")
        const token = window.localStorage.getItem("token");
        console.log("token", token)
        if (token === "dummy-token-123456") {
            console.log("token encontrado")
            setIsAuthenticated(true);
        } else {
            console.log("Não encontrei")
            setIsAuthenticated(false);
        }
    }, [])

    const value: AuthContextType = {
        isAuthenticated,
        login,
        logout,
        nome,
        cadastro
    }
    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    );
}

export function useAuth() { return useContext(InternalContext); }