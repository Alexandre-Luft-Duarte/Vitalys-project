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
} from "./ui/dialog.tsx";
import { Button } from "./ui/button.tsx";
import { Label } from "./ui/label.tsx";
import { Textarea } from "./ui/textarea.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select.tsx";
import { useToast } from "../hooks/use-toast.ts";
import { ClipboardPlus, AlertTriangle } from "lucide-react";

const internacaoSchema = z.object({
    justificativa: z.string().trim().min(10, "Justificativa deve ter pelo menos 10 caracteres").max(1000, "Justificativa muito longa"),
    urgencia: z.string().min(1, "Selecione o nível de urgência"),
    setor: z.string().min(1, "Selecione a ala/setor de destino"),
});

type InternacaoFormData = z.infer<typeof internacaoSchema>;

interface SolicitarInternacaoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pacienteNome: string;
}

const niveisUrgencia = [
    { value: "alta", label: "Alta", color: "text-destructive" },
    { value: "media", label: "Média", color: "text-amber-600" },
    { value: "baixa", label: "Baixa", color: "text-blue-600" },
];

const setores = [
    "UTI - Unidade de Terapia Intensiva",
    "Enfermaria Clínica",
    "Enfermaria Cirúrgica",
    "Pediatria",
    "Maternidade",
    "Cardiologia",
    "Neurologia",
    "Ortopedia",
    "Oncologia",
];

const SolicitarInternacaoModal = ({
                                      open,
                                      onOpenChange,
                                      pacienteNome,
                                  }: SolicitarInternacaoModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<InternacaoFormData>({
        resolver: zodResolver(internacaoSchema),
    });

    const onSubmit = async (data: InternacaoFormData) => {
        setIsSubmitting(true);

        // Simular solicitação de internação
        setTimeout(() => {
            console.log("Internação solicitada:", {
                paciente: pacienteNome,
                ...data,
            });

            toast({
                title: "Internação Solicitada",
                description: `Solicitação de internação para ${pacienteNome} foi registrada com sucesso.`,
            });

            setIsSubmitting(false);
            reset();
            onOpenChange(false);
        }, 1000);
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <ClipboardPlus className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Solicitar Internação</DialogTitle>
                            <DialogDescription className="mt-1">
                                Preencha os dados para solicitar internação hospitalar
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

                    {/* Justificativa Médica */}
                    <div className="space-y-2">
                        <Label htmlFor="justificativa" className="text-foreground font-medium">
                            Justificativa Médica <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="justificativa"
                            placeholder="Descreva a justificativa clínica para a internação, incluindo diagnóstico, quadro atual e necessidade de cuidados hospitalares..."
                            {...register("justificativa")}
                            className="min-h-[120px] resize-none"
                            disabled={isSubmitting}
                        />
                        {errors.justificativa && (
                            <p className="text-sm text-destructive">{errors.justificativa.message}</p>
                        )}
                    </div>

                    {/* Nível de Urgência */}
                    <div className="space-y-2">
                        <Label htmlFor="urgencia" className="text-foreground font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            Nível de Urgência <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            onValueChange={(value) => setValue("urgencia", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione o nível de urgência" />
                            </SelectTrigger>
                            <SelectContent className="z-[100]">
                                {niveisUrgencia.map((nivel) => (
                                    <SelectItem key={nivel.value} value={nivel.value}>
                    <span className={`font-medium ${nivel.color}`}>
                      {nivel.label}
                    </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.urgencia && (
                            <p className="text-sm text-destructive">{errors.urgencia.message}</p>
                        )}
                    </div>

                    {/* Ala/Setor de Destino */}
                    <div className="space-y-2">
                        <Label htmlFor="setor" className="text-foreground font-medium">
                            Ala/Setor de Destino <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            onValueChange={(value) => setValue("setor", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione a ala ou setor" />
                            </SelectTrigger>
                            <SelectContent className="z-[100]">
                                {setores.map((setor) => (
                                    <SelectItem key={setor} value={setor}>
                                        {setor}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.setor && (
                            <p className="text-sm text-destructive">{errors.setor.message}</p>
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
                            className="h-11 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity font-semibold text-white"
                        >
                            {isSubmitting ? "Solicitando..." : "Confirmar Solicitação de Internação"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SolicitarInternacaoModal;
