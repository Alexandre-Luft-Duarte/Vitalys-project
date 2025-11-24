# 🏥 Sistema de Gestão Hospitalar (SGH) - Vitalys

![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📄 Sobre o Projeto

O **Vitalys** é um sistema completo de gestão hospitalar desenvolvido como trabalho acadêmico. O objetivo é informatizar o fluxo de atendimento clínico, otimizando processos desde a chegada do paciente na recepção, passando pela triagem e atendimento médico, até a solicitação de internação ou alta hospitalar.

O sistema foca na experiência do usuário, oferecendo interfaces intuitivas para médicos e recepcionistas, garantindo integridade de dados e agilidade no fluxo hospitalar.

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
- **Arquitetura:** MVC com camadas de DTOs, Services e Controllers.
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

Trabalho desenvolvido para a disciplina de Banco de Dados / Desenvolvimento Web da Unoesc.

| Foto | Nome | Função | Contato |
| :---: | :--- | :--- | :---: |
| <img src="./integrantes/alexandre.png" width="50px" height="50px" style="border-radius:50%"> | **Alexandre Luft Duarte** |
| <img src="./integrantes/ivan.png" width="50px" height="50px" style="border-radius:50%"> | **Ivan Lopes Nerilo** |
| <img src="./integrantes/rafael.png" width="50px" height="50px" style="border-radius:50%"> | **Rafael Vivian** | 
| <img src="./integrantes/gabriel.png" width="50px" height="50px" style="border-radius:50%"> | **Gabriel Werner** | 