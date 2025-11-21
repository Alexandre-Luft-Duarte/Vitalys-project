import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {ArrowLeft, Bed, Calendar, ClipboardPlus, Clock, User, Users} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useToast} from "@/hooks/use-toast.ts";
import {useEffect, useState} from "react";
import {formatDate} from "@/lib/utils.ts";
import EvolucaoInternacaoModal from "@/components/EvolucaoInternacaoModal.tsx";

interface PacienteInternado {
id: number;
nome: string;
cpf: string;
leito: string;
dataInternacao: string;
diagnostico: string;
medicoResponsavel: string;
status: "Estável" | "Observação" | "Crítico";
}



const PacientesInternados = () => {

const navigate = useNavigate();
const { toast } = useToast();
const [internacoes, setInternacoes] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedPaciente, setSelectedPaciente] = useState<any>(null);

function handlePacienteClick(paciente: any) {
  setSelectedPaciente(paciente);
  setIsModalOpen(true);
}

async function getPacientesInternados() {
  const response = await fetch('http://localhost:8080/api/internacoes/ativas');
  if (!response.ok) {
      toast({
          title: "Erro ao buscar internações.",
          description: "Verifique suas conexão e tente novamente.",
          variant: "destructive",
      });
  }

  const data = await response.json();
  setInternacoes(data);
}

const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; text: string }> = {
        ativa: {
            className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
            text: "Ativa",
        },
        finalizada: {
            className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
            text: "Finalizada",
        },
    };
    const variant = variants[status.toLowerCase()];
    return (
        <Badge className={`${variant.className} font-medium`} variant="outline">
            {variant.text}
        </Badge>
    );
};

useEffect(() => {
  getPacientesInternados();
}, [])

return (
<div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
  {/* Conteúdo Principal */}
  <main className="container mx-auto px-6 py-8">
      <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              <Button
                  size="lg"
                  onClick={() => navigate("/dashboard-profissional")}
                  className="h-20 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md"
              >
                  <Users className="h-6 w-6 mr-3" />
                  Pacientes na fila
              </Button>
          </div>
      </section>

    {/* Tabela de Pacientes */}
    <div className="bg-card rounded-lg border border-border shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-accent px-6 py-4">
        <h2 className="text-xl font-bold text-primary-foreground">
          Lista de Pacientes Internados
        </h2>
        <p className="text-sm text-primary-foreground/80 mt-1">
          Acompanhamento completo dos pacientes internados
        </p>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-semibold text-foreground">
                Paciente
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                CPF
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Data Internação
              </TableHead>
            <TableHead className="font-semibold text-foreground">
                Motivo
            </TableHead>
            <TableHead className="font-semibold text-foreground">
                Médico Responsável
            </TableHead>
            <TableHead className="font-semibold text-foreground">
                Médico Responsável
            </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {internacoes.map((internacao: any) => (
              <TableRow
                key={internacao.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
                onClick={() => handlePacienteClick(internacao.paciente)}
              >
                <TableCell className="font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {internacao.paciente.nomeCompleto}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {internacao.paciente.cpf}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(internacao.dataEntrada)}
                  </div>
                </TableCell>
                  <TableCell className="text-muted-foreground">
                      {internacao.atendimento.motivo}
                  </TableCell>
                <TableCell className="text-muted-foreground">
                  {internacao.profissional.nomeCompleto}
                </TableCell>
                <TableCell>
                    {getStatusBadge(internacao.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </main>

    <EvolucaoInternacaoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        paciente={selectedPaciente}
    />
</div>
);
};
export default PacientesInternados;

