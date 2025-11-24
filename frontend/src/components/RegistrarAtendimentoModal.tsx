import {useEffect, useState} from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList } from "lucide-react";

const atendimentoSchema = z.object({
    motivoVisita: z.string().trim().min(3, "Motivo deve ter pelo menos 3 caracteres").max(500, "Motivo muito longo"),
    departamento: z.string().min(1, "Selecione um departamento"),
});

type AtendimentoFormData = z.infer<typeof atendimentoSchema>;

interface RegistrarAtendimentoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pacienteNome: string;
    pacienteId: number;
}

const RegistrarAtendimentoModal = ({
                                       open,
                                       onOpenChange,
                                       pacienteNome,
                                       pacienteId,
                                   }: RegistrarAtendimentoModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departamentos, setDepartamentos] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AtendimentoFormData>({
        resolver: zodResolver(atendimentoSchema),
    });



    const onSubmit = async (data: AtendimentoFormData) => {
        setIsSubmitting(true);
        const idDepartamento = departamentos?.find((dept: any) => dept.nome = data.departamento)?.idDepartamento;
        const recepcionistaId = window.localStorage.getItem("idUsuario");

        const payload = {
            recepcionistaId,
            pacienteId,
            departamentoId: idDepartamento,
            motivo: data.motivoVisita
        }

        console.log("Payload:", payload);

        const response = await fetch("http://localhost:8080/api/atendimentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            toast({
                title: "Erro ao registrar atendimento",
                description: "Ocorreu um erro ao registrar o atendimento. Por favor, tente novamente.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        toast({
            title: "Atendimento registrado com sucesso!",
            description: `${pacienteNome} foi encaminhado para ${data.departamento}.`,
        });
        setIsSubmitting(false);
        reset();
        onOpenChange(false);
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

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
        console.log("Departamentos:", data);
        setDepartamentos(data);
    };

    useEffect(() => {
        fetchDepartamentos();
    }, [])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Registrar Novo Atendimento</DialogTitle>
                            <DialogDescription className="mt-1">
                                Preencha as informações para registrar a entrada do paciente
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* Nome do Paciente (bloqueado) */}
                    <div className="space-y-2">
                        <Label htmlFor="pacienteNome" className="text-foreground font-medium">
                            Paciente
                        </Label>
                        <Input
                            id="pacienteNome"
                            value={pacienteNome}
                            disabled
                            className="h-11 bg-muted text-foreground font-medium cursor-not-allowed"
                        />
                    </div>

                    {/* Motivo da Visita */}
                    <div className="space-y-2">
                        <Label htmlFor="motivoVisita" className="text-foreground font-medium">
                            Motivo da Visita <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="motivoVisita"
                            placeholder="Ex: Consulta de rotina, Dor no peito, Check-up anual..."
                            {...register("motivoVisita")}
                            className="min-h-[100px] resize-none"
                            disabled={isSubmitting}
                        />
                        {errors.motivoVisita && (
                            <p className="text-sm text-destructive">{errors.motivoVisita.message}</p>
                        )}
                    </div>

                    {/* Encaminhar para Departamento */}
                    <div className="space-y-2">
                        <Label htmlFor="departamento" className="text-foreground font-medium">
                            Encaminhar para Departamento <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            onValueChange={(value) => setValue("departamento", value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione o departamento" />
                            </SelectTrigger>
                            <SelectContent className="z-[100]">
                                {departamentos.map((dept: any, index) => (
                                    <SelectItem key={`${dept.nome}${dept.idDepartamento}${index}`} value={dept.nome}>
                                        {dept.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.departamento && (
                            <p className="text-sm text-destructive">{errors.departamento.message}</p>
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
                            className="h-11 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold"
                        >
                            {isSubmitting ? "Confirmando..." : "Confirmar Entrada do Paciente"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrarAtendimentoModal;
