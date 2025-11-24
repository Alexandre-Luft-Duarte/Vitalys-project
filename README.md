🏥 Sistema de Gestão Hospitalar (SGH) - Vitalys

📄 Sobre o Projeto

O Vitalys é um sistema completo de gestão hospitalar desenvolvido como trabalho acadêmico. O objetivo é informatizar o fluxo de atendimento clínico, otimizando processos desde a chegada do paciente na recepção, passando pela triagem e atendimento médico, até a solicitação de internação ou alta hospitalar.

O sistema foca na experiência do usuário, oferecendo interfaces intuitivas para médicos e recepcionistas, garantindo integridade de dados e agilidade no fluxo hospitalar.

✨ Funcionalidades Principais

🩺 Módulo de Atendimento (Médico)

Fila de Espera em Tempo Real: Visualização clara dos pacientes aguardando, em atendimento e finalizados.

Chamada de Paciente: Alteração de status e redirecionamento para o prontuário.

Prontuário Eletrônico:

Visualização de dados demográficos (integrado ao módulo de Pessoas).

Registro de Anamnese, Evolução, Prescrição e Solicitação de Exames.

Salvamento de notas clínicas (AnotacaoMedica).

Solicitação de Internação: Modal integrado para solicitar leito, definindo prioridade (Baixa, Média, Alta) e justificativa.

Finalização: Encerramento do ciclo de atendimento com registro de alta.

🏥 Gestão de Internações

Fluxo de status automatizado: SOLICITADA -> ATIVA -> FINALIZADA.

Controle de alocação de leitos e setores.

🛠️ Tecnologias Utilizadas

Backend (API REST)

Linguagem: Java 17+

Framework: Spring Boot 3 (Web, Data JPA, Validation)

Arquitetura: MVC com camadas de DTOs, Services e Controllers.

Banco de Dados: PostgreSQL 15.

Frontend (SPA)

Framework: React + Vite

Linguagem: TypeScript

Estilização: Tailwind CSS + Shadcn/ui

Roteamento: React Router Dom

📂 Estrutura do Projeto

O projeto está organizado em um monorepo contendo backend, frontend e documentação.

VITALYS/
├── 📂 backend/           # API Spring Boot
│   ├── src/main/java/org/unoesc/backend/
│   │   ├── 📂 config/      # Configurações (CORS, Security)
│   │   ├── 📂 controller/  # Endpoints da API (AtendimentoController, etc.)
│   │   ├── 📂 dto/         # Objetos de Transferência de Dados (Records)
│   │   ├── 📂 model/       # Entidades JPA (Mapeamento do Banco)
│   │   └── 📂 repository/  # Interfaces de acesso a dados (JPA Repository)
│   ├── docker-compose.yml  # Orquestração de containers
│   └── pom.xml             # Dependências Maven
│
├── 📂 banco/             # Scripts SQL
│   └── script-criacao.sql  # DDL completo do banco, triggers e procedures
│
├── 📂 diagramas/         # Documentação Visual
│   └── (Arquivos do Modelo ER e Diagramas de Classe)
│
├── 📂 frontend/          # Aplicação React
│   ├── src/
│   │   ├── 📂 components/  # Componentes reutilizáveis (Botões, Modais, Tabelas)
│   │   ├── 📂 contexts/    # Gerenciamento de estado global
│   │   ├── 📂 hooks/       # Custom Hooks
│   │   ├── 📂 layouts/     # Estruturas de página (Header, Sidebar)
│   │   └── 📂 pages/       # Telas da aplicação (Dashboard, Atendimento)
│   ├── tailwind.config.ts  # Configuração de estilos
│   └── vite.config.ts      # Configuração do Build
│
└── 📂 integrantes/       # Fotos da equipe


🗄️ Modelagem de Dados

O banco de dados utiliza uma estratégia robusta de herança (JOINED), garantindo normalização e integridade:

Pessoa (Tabela Pai): Centraliza id, nome, cpf, data_nascimento.

Usuario: Estende Pessoa (adiciona email, senha).

Profissional / Recepcionista: Estendem Usuario.

Paciente: Estende Pessoa (adiciona descricao_medica).

🚀 Como Executar o Projeto

Pré-requisitos

JDK 17+ instalado.

Node.js 18+ instalado.

PostgreSQL instalado e rodando.

1. Configuração do Banco de Dados

Crie um banco de dados chamado hospital_db e execute o script SQL localizado em /banco/script-criacao.sql.

2. Executando o Backend

cd backend
# Configure o application.properties com suas credenciais do Postgres
./mvnw spring-boot:run


O servidor iniciará em http://localhost:8080.

3. Executando o Frontend

cd frontend
npm install
npm run dev


A aplicação estará disponível em http://localhost:5173.

🔌 Documentação da API (Principais Endpoints)

Método

Endpoint

Descrição

POST

/api/atendimentos

Cria um novo atendimento (Recepção)

GET

/api/atendimentos

Lista a fila de espera (Dashboard)

GET

/api/atendimentos/{id}

Busca detalhes do atendimento e paciente

PUT

/api/atendimentos/{id}/iniciar

Muda status para EM_ATENDIMENTO

POST

/api/atendimentos/{id}/anotacoes

Salva anamnese/evolução

POST

/api/atendimentos/{id}/internacao

Cria uma solicitação de internação

PUT

/api/atendimentos/{id}/finalizar

Encerra o atendimento

👥 Integrantes da Equipe

<table>
<tr>
<td align="center">
<a href="#">
<img src="./integrantes/alexandre.png" width="100px;" alt="Foto do Integrante 1" style="border-radius:50%"/>
<br />
<sub><b>Alexandre Luft Duarte</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="#">
<img src="./integrantes/ivan.png" width="100px;" alt="Foto do Integrante 2" style="border-radius:50%"/>
<br />
<sub><b>Ivan Lopes Nerilo</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="#">
<img src="./integrantes/rafael.png" width="100px;" alt="Foto do Integrante 3" style="border-radius:50%"/>
<br />
<sub><b>Rafael Vivian</b></sub>
</a>
<br />
</td>
<td align="center">
<a href="#">
<img src="./integrantes/gabriel.jpg" width="100px;" alt="Foto do Integrante 4" style="border-radius:50%"/>
<br />
<sub><b>Gabriel Morin Werner</b></sub>
</a>
<br />
</td>
</tr>
</table>