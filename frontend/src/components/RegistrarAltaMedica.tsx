import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog.tsx";
import { Button } from "./ui/button.tsx";
import { Label } from "./ui/label.tsx";
import { Textarea } from "./ui/textarea.tsx";
import { useToast } from "../hooks/use-toast.ts";
import { CheckCircle, FileCheck } from "lucide-react";

// Schema atualizado sem o diagnóstico
const altaMedicaSchema = z.object({
    instrucoesPosAlta: z.string().trim().min(10, "Instruções devem ter pelo menos 10 caracteres").max(2000, "Instruções muito longas"),
});

type AltaMedicaFormData = z.infer<typeof altaMedicaSchema>;

interface RegistrarAltaMedicaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pacienteNome: string;
    atendimentoId: number; // Adicionado ID do atendimento para a URL
    onConfirmar: () => void;
}

const RegistrarAltaMedicaModal = ({
                                      open,
                                      onOpenChange,
                                      pacienteNome,
                                      atendimentoId,
                                      onConfirmar,
                                  }: RegistrarAltaMedicaModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AltaMedicaFormData>({
        resolver: zodResolver(altaMedicaSchema),
    });

    const onSubmit = async (data: AltaMedicaFormData) => {
        setIsSubmitting(true);

        try {
            // Tenta pegar o ID do usuário logado (fallback para 1 se não existir)
            const profissionalId = localStorage.getItem("idUsuario");

            const payload = {
                textoAnotacao: `ALTA MÉDICA: ${data.instrucoesPosAlta}`, // Prefixo opcional para identificar que é alta
                profissionalId: Number(profissionalId)
            };

            const response = await fetch(`http://localhost:8080/api/atendimentos/${atendimentoId}/anotacoes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Falha ao registrar alta médica.");
            }

            toast({
                title: "Alta Médica Registrada",
                description: `As instruções de alta para ${pacienteNome} foram salvas.`,
                className: "bg-green-600 text-white border-none"
            });

            reset();
            onOpenChange(false);
            onConfirmar(); // Chama a função do pai para redirecionar ou atualizar tela

        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao registrar",
                description: "Não foi possível salvar as informações de alta. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Registrar Alta Médica</DialogTitle>
                            <DialogDescription className="mt-1">
                                Finalize o atendimento com as orientações ao paciente.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* Nome do Paciente */}
                    <div className="bg-muted/50 rounded-lg p-3 border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Paciente</p>
                        <p className="text-sm font-semibold text-foreground">{pacienteNome}</p>
                    </div>

                    {/* Instruções de Pós-alta */}
                    <div className="space-y-2">
                        <Label htmlFor="instrucoesPosAlta" className="text-foreground font-medium">
                            Instruções de Pós-alta / Anotações Finais <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="instrucoesPosAlta"
                            placeholder="Inclua orientações sobre medicamentos, repouso, alimentação, sinais de alerta, retorno, restrições de atividades, etc..."
                            {...register("instrucoesPosAlta")}
                            className="min-h-[180px] resize-none"
                            disabled={isSubmitting}
                        />
                        <p className="text-xs text-muted-foreground">
                            Este texto será salvo como uma anotação médica vinculada ao atendimento.
                        </p>
                        {errors.instrucoesPosAlta && (
                            <p className="text-sm text-destructive">{errors.instrucoesPosAlta.message}</p>
                        )}
                    </div>

                    {/* Botões de ação */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="h-11 px-6"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity font-semibold text-white"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Registrando..." : "Confirmar Alta Médica"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrarAltaMedicaModal;