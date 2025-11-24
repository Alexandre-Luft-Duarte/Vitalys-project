import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bed, Calendar, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils"; 

const evolucaoSchema = z.object({
    evolucao: z.string().trim().min(10, "Evolução deve ter pelo menos 10 caracteres").max(2000, "Texto muito longo"),
});

type EvolucaoFormData = z.infer<typeof evolucaoSchema>;

interface InternacaoData {
    id: number;
    status: string;
    dataEntrada: string;
    paciente: {
        id: number;
        nomeCompleto: string;
        cpf: string;
    };
    atendimento: {
        motivo: string;
    };
    profissional: {
        nomeCompleto: string;
    };
    leito?: string; 
}

interface EvolucaoInternacaoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    internacao: InternacaoData | null; 
    onUpdate: Function,
}

const EvolucaoInternacaoModal = ({
    open,
    onOpenChange,
    internacao,
    onUpdate
}: EvolucaoInternacaoModalProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EvolucaoFormData>({
        resolver: zodResolver(evolucaoSchema),
    });

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = async (data: EvolucaoFormData) => {
        if (!internacao) return;
        setIsSubmitting(true);


        console.log(internacao)

        const response = await fetch(`http://localhost:8080/api/internacoes/${internacao.idInternacao}/evolucoes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              profissionalId: internacao.profissional.idPessoa,
              textoEvolucao: data.evolucao
            })
        })

        console.log(response);
        
        if (!response.ok) {
            toast({
                title: "Falha ao registrar evolução!",
                description: `Verifique a sua conexão e tente novamente mais tarde!`,
                variant: "destructive",
            });
        }

        toast({
          title: "Evolução registrada!",
          description: `Evolução de ${internacao.paciente.nomeCompleto} foi salva com sucesso.`,
        });

        setIsSubmitting(false);
        reset();
        onOpenChange(false);
        onUpdate();
    };

    const handleAltaMedica = async () => {
        if (!internacao) return;
        setIsSubmitting(true);


        const response = await fetch(`http://localhost:8080/api/internacoes/${internacao.idInternacao}/registrar-alta`, {
            method: "PUT"
        })
        
        if (!response.ok) {
            toast({
                title: "Falha ao dar alta médica!",
                description: `Verifique a sua conexão e tente novamente mais tarde!`,
                variant: "destructive",
            });
        }

        toast({
            title: "Alta médica registrada!",
            description: `${internacao.paciente.nomeCompleto} recebeu alta médica com sucesso.`,
        });

        setIsSubmitting(false);
        reset();
        onOpenChange(false);
        onUpdate();
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

    const getStatusBadge = (status: string) => {
        const statusNormalized = status?.toLowerCase() || "";
        
        let className = "bg-gray-100 text-gray-800 border-gray-200";
        
        if (statusNormalized === 'ativa' || statusNormalized === 'estável') {
            className = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
        } else if (statusNormalized === 'observação') {
            className = "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
        } else if (statusNormalized === 'crítico' || statusNormalized === 'finalizada') {
            className = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
        }

        return (
            <Badge className={`${className} font-medium`} variant="outline">
                {status || "N/A"}
            </Badge>
        );
    };

    if (!internacao) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Evolução de Internação</DialogTitle>
                            <DialogDescription className="mt-1">
                                Registre a evolução do paciente e atualize seu status
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* Informações do Paciente */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold text-foreground">
                                    {internacao.paciente.nomeCompleto}
                                </span>
                            </div>
                            {getStatusBadge(internacao.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-muted-foreground">CPF:</span>
                                <span className="ml-2 text-foreground font-medium">
                                    {internacao.paciente.cpf}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-muted-foreground">Internação:</span>
                                <span className="ml-2 text-foreground font-medium">
                                    {typeof formatDate === 'function' ? formatDate(internacao.dataEntrada) : internacao.dataEntrada}
                                </span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Diagnóstico:</span>
                                <span className="ml-2 text-foreground font-medium">
                                    {internacao.atendimento.motivo}
                                </span>
                            </div>
                        </div>
                        
                        <div className="text-sm pt-2 border-t border-border">
                            <span className="text-muted-foreground">Médico Responsável:</span>
                            <span className="ml-2 text-foreground font-medium">
                                {internacao.profissional.nomeCompleto}
                            </span>
                        </div>
                    </div>

                    {/* Evolução do Paciente */}
                    <div className="space-y-2">
                        <Label htmlFor="evolucao" className="text-foreground font-medium">
                            Evolução do Paciente <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="evolucao"
                            placeholder="Descreva a evolução clínica do paciente: sinais vitais, sintomas, resposta ao tratamento, exames realizados, condutas tomadas..."
                            {...register("evolucao")}
                            className="min-h-[180px] resize-none"
                            disabled={isSubmitting}
                        />
                        {errors.evolucao && (
                            <p className="text-sm text-destructive">{errors.evolucao.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="h-11 px-6"
                        >
                            Cancelar
                        </Button>
                        
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleAltaMedica}
                                disabled={isSubmitting}
                                className="h-11 px-6"
                            >
                                {isSubmitting ? "Processando..." : "Dar Alta Médica"}
                            </Button>
                            
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-11 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold"
                            >
                                {isSubmitting ? "Salvando..." : "Salvar Evolução"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EvolucaoInternacaoModal;