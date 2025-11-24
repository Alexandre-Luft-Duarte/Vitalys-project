-- Criar Roles
CREATE ROLE role_admin;
CREATE ROLE role_medico;
CREATE ROLE role_atendimento;

-- Admin: Acesso total
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO role_admin;

-- Médicos: Podem ver pacientes e gerenciar atendimentos/internações
GRANT SELECT ON paciente, pessoa, vw_relatorio_atendimentos, vw_mapa_internacao TO role_medico;
GRANT INSERT, UPDATE ON atendimento, anotacao_medica, internacao, evolucao_internacao TO role_medico;

-- Recepção: Cadastra pessoas e cria atendimentos
GRANT INSERT, UPDATE, SELECT ON pessoa, paciente, endereco, contato TO role_atendimento;
GRANT INSERT ON atendimento TO role_atendimento;

-- Criar usuários de exemplo
CREATE USER usr_admin WITH PASSWORD 'admin123';
GRANT role_admin TO usr_admin;

CREATE USER usr_medico_roberto WITH PASSWORD 'med123';
GRANT role_medico TO usr_medico_roberto;