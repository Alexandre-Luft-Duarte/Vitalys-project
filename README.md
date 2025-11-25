# 🏥 Sistema de Gestão Hospitalar (SGH) - Vitalys

![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📄 Sobre o Projeto

O **Vitalys** é um sistema completo de gestão hospitalar. O objetivo é informatizar o fluxo de atendimento clínico, otimizando processos desde a chegada do paciente na recepção, passando pela triagem e atendimento médico, até a solicitação de internação ou alta hospitalar.

O sistema foca na experiência do usuário, oferecendo interfaces intuitivas para médicos e recepcionistas, garantindo integridade de dados e agilidade no fluxo hospitalar.

---
## 📋 Requisitos do Sistema

### 🏷️ Atores

| ID | Ator | Descrição |
| :---: | :--- | :--- |
| **P-01** | **Recepcionista** (Administrativo) | Responsável pelo *front desk*. Cadastra pacientes, gerencia contatos/endereços e registra a entrada do paciente no hospital (criação do atendimento). |
| **P-03** | **Profissional de Saúde** (Médico/Enfermeiro) | Responsável pelo cuidado assistencial. Realiza atendimentos, consulta históricos, solicita exames, prescreve medicamentos e gerencia internações. |

---

### 📌 Requisitos Funcionais

#### 🔐 Categoria: Gestão de Acesso e Usuários
- **RF-001:** O sistema deve permitir que um usuário (Recepcionista, Profissional) autentique-se usando e-mail e senha.
- **RF-002:** O usuário deve poder realizar logout do sistema.

#### 📝 Categoria: Cadastros Essenciais
- **RF-003:** O Recepcionista deve poder cadastrar, consultar e editar informações de Pacientes (dados completos, contatos, endereços).

#### 🩺 Categoria: Atendimentos e Internações
- **RF-004:** O Recepcionista deve poder registrar um novo Atendimento, associando um Paciente, um Departamento e (opcionalmente) um Profissional de Saúde.
- **RF-005:** O Profissional de Saúde deve poder visualizar a fila de pacientes aguardando atendimento em seu departamento.
- **RF-006:** O Profissional de Saúde deve poder iniciar um Atendimento (mudança de status de `Aguardando` para `Em Atendimento`).
- **RF-007:** O Profissional de Saúde deve poder solicitar uma Internação para um Paciente durante um atendimento, caso necessário.
- **RF-008:** O Profissional de Saúde deve poder registrar a alta médica de um paciente, finalizando a Internação.

#### 📂 Categoria: Histórico Clínico Integrado
- **RF-010:** O Profissional de Saúde deve, durante um atendimento, poder visualizar o histórico completo de atendimentos e internações do paciente.
- **RF-011:** O Profissional de Saúde deve poder registrar Anotações Médicas (evolução, anamnese) no atendimento atual.
- **RF-012:** O Profissional de Saúde deve poder finalizar um Atendimento.

#### 📊 Categoria: Relatórios Estratégicos
- **RF-013:** O Profissional deve poder gerar o **"Relatório de Pacientes Ativos"** (conforme Consulta 1).
- **RF-014:** O Profissional de Saúde deve poder gerar o **"Relatório de Atendimentos de um Paciente"** (conforme Consulta 2).
- **RF-015:** O Gestor deve poder gerar o **"Relatório de Atendimentos por Profissional de Saúde"** (conforme Consulta 3).
- **RF-016:** O Gestor deve poder gerar o **"Relatório Resumido de Atendimentos por Departamento"** (conforme Consulta 4).

---

### ⚙️ Requisitos Não Funcionais

#### 💻 Categoria: Técnicos
- **RNF-001:** O sistema deve ser desenvolvido na linguagem **Java**, aplicando conceitos de POO (encapsulamento, herança, polimorfismo).
- **RNF-002:** O sistema deve utilizar **PostgreSQL** como SGBD.
- **RNF-003:** O sistema deve garantir a persistência dos dados.
- **RNF-004:** O banco de dados deve implementar **triggers** para controle de integridade ou auditoria (ex: registrar mudança de status do leito).
- **RNF-005:** O banco de dados deve implementar **stored procedures** (funções) para regras de negócio (ex: função para dar alta em um paciente).
- **RNF-006:** O banco de dados deve utilizar **views** para simplificar as consultas dos relatórios.

#### 🏗️ Categoria: Desenvolvimento
- **RNF-007:** Todo o código-fonte deve ser versionado utilizando **Git** e hospedado no **GitHub**.
- **RNF-008:** O código Java deve ser documentado utilizando **JavaDOC**.
- **RNF-009:** O código deve seguir as convenções de nomenclatura do Java (clareza e legibilidade).

#### 🔒 Categoria: Segurança e Desempenho
- **RNF-010:** O sistema deve garantir que dados sensíveis do paciente (CPF, histórico clínico) não sejam acessíveis por usuários não autorizados.
- **RNF-011:** As consultas ao histórico do paciente (RF-010) devem ser executadas em menos de **3 segundos**.

---

## ✨ Funcionalidades Principais

### 🩺 Módulo de Atendimento (Médico)
- **Fila de Espera em Tempo Real:** Visualização clara dos pacientes aguardando, em atendimento e finalizados.
- **Chamada de Paciente:** Alteração de status e redirecionamento para o prontuário.
- **Prontuário Eletrônico:**
  - Visualização de dados demográficos (integrado ao módulo de Pessoas).
  - Registro de Anamnese, Evolução, Prescrição e Solicitação de Exames.
  - Salvamento de notas clínicas (`AnotacaoMedica`).
- **Solicitação de Internação:** Modal integrado para solicitar leito, definindo prioridade (Baixa, Média, Alta) e justificativa.
- **Finalização:** Encerramento do ciclo de atendimento com registro de alta.

### 🏥 Gestão de Internações
- Fluxo de status automatizado: `SOLICITADA` -> `ATIVA` -> `FINALIZADA`.
- Controle de alocação de leitos e setores.

---

## 🛠️ Tecnologias Utilizadas

### Backend (API REST)
- **Linguagem:** Java 17+
- **Framework:** Spring Boot 3 (Web, Data JPA, Validation)
- **Arquitetura:** Camadas de DTOs, Models, Repositorys e Controllers.
- **Banco de Dados:** PostgreSQL 15.

### Frontend (SPA)
- **Framework:** React + Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Shadcn/ui
- **Roteamento:** React Router Dom

---

## 📂 Estrutura do Projeto

O projeto está organizado em um monorepo contendo backend, frontend e documentação.

```text
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
```

## 🗄️ MODELAGEM DE DADOS

O banco de dados foi projetado utilizando a estratégia de herança **JOINED** (Tabela por Subclasse), garantindo alta normalização e integridade dos dados sem repetição de informações.

* **`Pessoa` (Tabela Pai):** Entidade centralizadora que armazena dados comuns (`id`, `nome`, `cpf`, `data_nascimento`).
* **`Usuario`:** Estende a tabela *Pessoa*, adicionando credenciais de acesso ao sistema (`email`, `senha`).
* **`Profissional` / `Recepcionista`:** Estendem *Usuario*, herdando tanto os dados pessoais quanto os de login.
* **`Paciente`:** Estende *Pessoa* diretamente, isolando os dados clínicos (ex: `descricao_medica`) dos dados de acesso ao sistema.

---

## 🚀 COMO EXECUTAR O PROJETO

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

- [ ] **Java JDK 17** ou superior.
- [ ] **Node.js 18** ou superior.
- [ ] **PostgreSQL** (Serviço ativo).

### Passo a Passo

#### 1. Configuração do Banco de Dados
1. Crie um banco de dados no PostgreSQL chamado `hospital_db`.
2. Localize a pasta `/banco` na raiz do projeto.
3. Execute o script `script-criacao.sql` no seu cliente SQL (PgAdmin, DBeaver ou psql) para criar as tabelas e triggers.

#### 2. Executando o Backend (API)
Abra o terminal na pasta `backend` e execute:

```bash
cd backend
# Caso necessário, ajuste o arquivo application.properties com seu usuário/senha do banco
./mvnw spring-boot:run
```

#### 2. Executando o Frotend
Abra o terminal na pasta `frontend` e execute:

```bash
cd frontend
npm install
npm run dev
```


## 🔌 Documentação da API (Principais Endpoints)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/atendimentos` | Cria um novo atendimento (Recepção) |
| `GET` | `/api/atendimentos` | Lista a fila de espera (Dashboard) |
| `GET` | `/api/atendimentos/{id}` | Busca detalhes do atendimento e paciente |
| `PUT` | `/api/atendimentos/{id}/iniciar` | Muda status para `EM_ATENDIMENTO` |
| `POST` | `/api/atendimentos/{id}/anotacoes` | Salva anamnese/evolução |
| `POST` | `/api/atendimentos/{id}/internacao` | Cria uma solicitação de internação |
| `PUT` | `/api/atendimentos/{id}/finalizar` | Encerra o atendimento |


## 👥 Integrantes da Equipe

Conheça os membros da equipe que desenvolveram este projeto:

| Foto                                 | Nome                  |
| :-----------------------------------: | :-------------------- |
| ![Foto de Alexandre Luft Duarte](/integrantes/alexandre.png) | Alexandre Luft Duarte |
| ![Foto de Ivan Lopes Nerilo](/integrantes/ivan.png)         | Ivan Lopes Nerilo     |
| ![Foto de Rafael Gustavo Vivian](/integrantes/rafael.png) | Rafael Gustavo Vivian |
| ![Foto de Rafael Gustavo Vivian](/integrantes/gabriel.png) | Gabriel Morin Werner |
