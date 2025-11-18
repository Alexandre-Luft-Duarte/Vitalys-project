import {useState, createContext, useContext, useEffect} from "react";
type contextType =  {
    isAuthenticated: boolean | null
    login: (email: string, senha: string) => Promise<void>
    logout: () => void
    nome: string
}
const InternalContext = createContext<contextType>(false as unknown as contextType);

export function AuthContext({ children } : { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const nome: string = window.localStorage.getItem("nome") || "User";

    async function login(email: string, senha: string) {
        const response = await fetch("http://localhost:8080/api/auth/login", {
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
        setIsAuthenticated(true);
        return data;
    }

    async function logout() {
        setIsAuthenticated(false);
        window.localStorage.removeItem("token");
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

    const value: contextType = {
        isAuthenticated,
        login,
        logout,
        nome
    }
    return (
        <InternalContext.Provider value={value}>
            {children}
        </InternalContext.Provider>
    );
}

export function useAuth() { return useContext(InternalContext); }