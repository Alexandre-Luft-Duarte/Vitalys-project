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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, FileCheck } from "lucide-react";

const altaMedicaSchema = z.object({
    diagnosticoFinal: z.string().trim().min(3, "Diagnóstico deve ter pelo menos 3 caracteres").max(200, "Diagnóstico muito longo"),
    instrucoesPosAlta: z.string().trim().min(10, "Instruções devem ter pelo menos 10 caracteres").max(2000, "Instruções muito longas"),
});

type AltaMedicaFormData = z.infer<typeof altaMedicaSchema>;

interface RegistrarAltaMedicaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pacienteNome: string;
    onConfirmar: () => void;
}

const RegistrarAltaMedicaModal = ({
                                      open,
                                      onOpenChange,
                                      pacienteNome,
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

        // Simular registro de alta médica
        setTimeout(() => {
            console.log("Alta médica registrada:", {
                paciente: pacienteNome,
                ...data,
            });

            toast({
                title: "Alta Médica Registrada",
                description: `Alta médica de ${pacienteNome} foi registrada com sucesso.`,
            });

            setIsSubmitting(false);
            reset();
            onOpenChange(false);
            onConfirmar();
        }, 1000);
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
                                Finalize o atendimento com o diagnóstico e orientações ao paciente
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

                    {/* Diagnóstico Final */}
                    <div className="space-y-2">
                        <Label htmlFor="diagnosticoFinal" className="text-foreground font-medium">
                            Diagnóstico Final <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="diagnosticoFinal"
                            placeholder="Ex: Hipertensão arterial sistêmica, Pneumonia bacteriana..."
                            {...register("diagnosticoFinal")}
                            className="h-11"
                            disabled={isSubmitting}
                        />
                        {errors.diagnosticoFinal && (
                            <p className="text-sm text-destructive">{errors.diagnosticoFinal.message}</p>
                        )}
                    </div>

                    {/* Instruções de Pós-alta */}
                    <div className="space-y-2">
                        <Label htmlFor="instrucoesPosAlta" className="text-foreground font-medium">
                            Instruções de Pós-alta para o Paciente <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="instrucoesPosAlta"
                            placeholder="Inclua orientações sobre medicamentos, repouso, alimentação, sinais de alerta, retorno, restrições de atividades, etc..."
                            {...register("instrucoesPosAlta")}
                            className="min-h-[180px] resize-none"
                            disabled={isSubmitting}
                        />
                        <p className="text-xs text-muted-foreground">
                            Estas instruções serão impressas e entregues ao paciente
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
