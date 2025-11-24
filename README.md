# 🏥 Vitalys

![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## 📄 Sobre o Projeto

Este é um sistema completo de gestão hospitalar. O objetivo é informatizar o fluxo de atendimento clínico, desde a chegada do paciente na recepção, passando pela triagem e atendimento médico, até a solicitação de internação ou alta.

O sistema foca na experiência do profissional de saúde, oferecendo um dashboard intuitivo para gestão de filas e prontuário eletrônico.

---

## ✨ Funcionalidades Principais

### 🩺 Módulo de Atendimento (Médico)
- **Fila de Espera em Tempo Real:** Visualização dos pacientes aguardando, em atendimento e finalizados.
- **Chamada de Paciente:** Alteração de status de "Aguardando" para "Em Atendimento" com um clique.
- **Prontuário Eletrônico:**
  - Visualização de dados demográficos do paciente (integrado ao módulo de Pessoas).
  - Registro de Anamnese, Evolução, Prescrição e Exames.
  - Salvamento de notas clínicas (`AnotacaoMedica`).
- **Solicitação de Internação:** Modal integrado para solicitar leito, definindo prioridade e justificativa.
- **Finalização:** Encerramento do ciclo de atendimento.

### 🏥 Gestão de Internações
- Fluxo de status: `SOLICITADA` -> `ATIVA` -> `FINALIZADA`.
- Registro de motivo, prioridade (Baixa, Média, Alta) e setor de destino.

---

## 🛠️ Tecnologias Utilizadas

### Backend (API REST)
- **Linguagem:** Java 17+
- **Framework:** Spring Boot 3 (Web, Data JPA, Validation)
- **Arquitetura:** MVC com camadas de DTOs e Services.
- **Conceitos Aplicados:**
  - Herança de Entidades (`@Inheritance(strategy = InheritanceType.JOINED)`).
  - DTOs (Data Transfer Objects) para segurança e organização (`record`).
  - Tratamento de exceções e status HTTP adequados.

### Frontend (SPA)
- **Framework:** React + Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Shadcn/ui
- **Roteamento:** React Router Dom
- **Comunicação:** Fetch API com `useEffect` e gerenciamento de estados (`useState`).

### Banco de Dados
- **SGBD:** PostgreSQL
- **Modelagem:** Relacional (3FN)
- **Recursos Avançados:**
  - Triggers (Auditoria e Validação).
  - Stored Procedures (Automação de processos).
  - Views (Relatórios de ocupação e histórico).

---

## 🗄️ Modelagem de Dados

O banco de dados utiliza uma estratégia robusta de herança:

- **Pessoa (Tabela Pai):** Centraliza `id`, `nome`, `cpf`, `data_nascimento`.
- **Usuario:** Estende Pessoa (adiciona `email`, `senha`).
- **Profissional / Recepcionista:** Estendem Usuario.
- **Paciente:** Estende Pessoa (adiciona `descricao_medica`).

Isso evita redundância de dados e facilita a manutenção.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- JDK 17+ instalado.
- Node.js 18+ instalado.
- PostgreSQL instalado e rodando.

### 1. Configuração do Banco de Dados
Crie um banco de dados chamado `hospital_db` e execute o script SQL fornecido na pasta `/database` (contém a criação de tabelas, triggers e procedures).

### 2. Executando o Backenda
```bash
cd backend
# Configure o application.properties com suas credenciais do Postgres
./mvnw spring-boot:run

### 3. Executando o Frontend
cd frontend
npm install
npm run dev

---

## 👥 Equipe

Conheça os membros da equipe que desenvolveram este projeto:

| Foto                                 | Nome                  |
| :-----------------------------------: | :-------------------- |
| ![Foto de Alexandre Luft Duarte](fotos/alexandre.png) | Alexandre Luft Duarte |
| ![Foto de Ivan Lopes Nerilo](fotos/ivan.png)         | Ivan Lopes Nerilo     |
| ![Foto de Rafael Gustavo Vivian](fotos/rafael.png) | Rafael Gustavo Vivian |

---