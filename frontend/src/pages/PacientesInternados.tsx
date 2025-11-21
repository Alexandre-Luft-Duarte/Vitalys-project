import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bed, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const pacientesInternados: PacienteInternado[] = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    cpf: "123.456.789-00",
    leito: "201-A",
    dataInternacao: "15/11/2025",
    diagnostico: "Pneumonia",
    medicoResponsavel: "Dr. Roberto Almeida",
    status: "Estável",
  },
  {
    id: 2,
    nome: "João Pedro Oliveira",
    cpf: "987.654.321-00",
    leito: "202-B",
    dataInternacao: "16/11/2025",
    diagnostico: "Infarto Agudo do Miocárdio",
    medicoResponsavel: "Dra. Ana Costa",
    status: "Crítico",
  },
  {
    id: 3,
    nome: "Carlos Eduardo Mendes",
    cpf: "456.789.123-00",
    leito: "203-A",
    dataInternacao: "17/11/2025",
    diagnostico: "Fratura de Fêmur",
    medicoResponsavel: "Dr. Roberto Almeida",
    status: "Estável",
  },
  {
    id: 4,
    nome: "Fernanda Rodrigues",
    cpf: "321.654.987-00",
    leito: "204-C",
    dataInternacao: "18/11/2025",
    diagnostico: "Apendicite",
    medicoResponsavel: "Dr. Paulo Santos",
    status: "Observação",
  },
];

const PacientesInternados = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: PacienteInternado["status"]) => {
    const variants: Record<PacienteInternado["status"], { className: string; text: string }> = {
      Estável: {
        className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
        text: "Estável",
      },
      Observação: {
        className: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
        text: "Observação",
      },
      Crítico: {
        className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
        text: "Crítico",
      },
    };

    const variant = variants[status];
    return (
      <Badge className={`${variant.className} font-medium`} variant="outline">
        {variant.text}
      </Badge>
    );
  };

  const pacientesCriticos = pacientesInternados.filter((p) => p.status === "Crítico").length;
  const pacientesEstaveis = pacientesInternados.filter((p) => p.status === "Estável").length;
  const pacientesObservacao = pacientesInternados.filter((p) => p.status === "Observação").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Cabeçalho */}
      {/*<header className="bg-card border-b border-border shadow-sm">*/}
      {/*  <div className="container mx-auto px-6 py-4">*/}
      {/*    <div className="flex items-center justify-between">*/}
      {/*      <div className="flex items-center gap-4">*/}
      {/*        <Button*/}
      {/*          variant="ghost"*/}
      {/*          size="sm"*/}
      {/*          onClick={() => navigate("/dashboard-profissional")}*/}
      {/*          className="text-muted-foreground hover:text-foreground"*/}
      {/*        >*/}
      {/*          <ArrowLeft className="h-5 w-5" />*/}
      {/*        </Button>*/}
      {/*        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">*/}
      {/*          <Bed className="h-6 w-6 text-primary" />*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <h1 className="text-xl font-bold text-foreground">*/}
      {/*            Pacientes Internados*/}
      {/*          </h1>*/}
      {/*          <p className="text-sm text-muted-foreground">*/}
      {/*            {pacientesInternados.length} pacientes internados*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</header>*/}

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-6 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Pacientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {pacientesInternados.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Estáveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {pacientesEstaveis}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Observação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {pacientesObservacao}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Críticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {pacientesCriticos}
              </div>
            </CardContent>
          </Card>
        </div>

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
                    Leito
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Data Internação
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Diagnóstico
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Médico Responsável
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pacientesInternados.map((paciente) => (
                  <TableRow
                    key={paciente.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {paciente.nome}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {paciente.cpf}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        {paciente.leito}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {paciente.dataInternacao}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {paciente.diagnostico}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {paciente.medicoResponsavel}
                    </TableCell>
                    <TableCell>{getStatusBadge(paciente.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PacientesInternados;