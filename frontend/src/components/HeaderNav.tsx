import {LogOut, UserCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export default function HeaderNav() {
    const {logout, nome} = useAuth();
    const navigator = useNavigate();

    function redirectUserToDashBoard() {
        const tipoUsuario = window.localStorage.getItem("tipoUsuario")
        if (tipoUsuario === "PROFISSIONAL") {
            navigator("/dashboard-profissional");
        } else {
            navigator("/dashboard");
        }
    }

    return (
        <header className="bg-card border-b border-border shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <img
                            src="/src/assets/vitalys2.png"
                            alt="Hospital Logo"
                            className="h-10 w-auto"
                        />
                        <nav className="flex gap-6">
                            <button
                                className="text-foreground font-medium hover:text-primary transition-colors"
                                onClick={() => redirectUserToDashBoard()}
                            >
                                Dashboard
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <UserCircle className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium text-foreground">{nome}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );

}