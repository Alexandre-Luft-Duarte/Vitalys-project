-- Departamentos
INSERT INTO departamento (nome) VALUES
                                    ('Recepção Central'), -- ID 1 (Mantive para o uso do Recepcionista)
                                    ('Clínica Geral'),    -- ID 2
                                    ('Cardiologia'),      -- ID 3
                                    ('Ortopedia'),        -- ID 4
                                    ('Pediatria'),        -- ID 5
                                    ('Neurologia'),       -- ID 6
                                    ('Dermatologia'),     -- ID 7
                                    ('Oftalmologia'),     -- ID 8
                                    ('Ginecologia'),      -- ID 9
                                    ('Urgência'),         -- ID 10
                                    ('Triagem');          -- ID 11

-- Especialidades
INSERT INTO especialidade (id_especialidade, nome) VALUES (1, 'Clínico Geral'),
                                                                   (2, 'Pediatra'),
                                                                   (3, 'Ortopedista'),
                                                                   (4, 'Cardiologista'),
                                                                   (5, 'Enfermeiro Chefe');

-- 1 e 2 serão Recepcionistas
INSERT INTO pessoa (id_pessoa, nome_completo, cpf, data_nascimento, status_ativo) VALUES
                                                                                      (1, 'Maria da Recepção', '111.111.111-11', '1990-05-15', true),
                                                                                      (2, 'João Atendente', '222.222.222-22', '1995-08-20', true);

-- 3, 4 e 5 serão Profissionais (Médicos)
INSERT INTO pessoa (id_pessoa, nome_completo, cpf, data_nascimento, status_ativo) VALUES
                                                                                      (3, 'Dr. Gregory House', '333.333.333-33', '1975-10-01', true),
                                                                                      (4, 'Dra. Meredith Grey', '444.444.444-44', '1982-03-12', true),
                                                                                      (5, 'Dr. Shaun Murphy', '555.555.555-55', '1992-07-07', true);

-- 6, 7, 8 e 9 serão Pacientes
INSERT INTO pessoa (id_pessoa, nome_completo, cpf, data_nascimento, status_ativo) VALUES
                                                                                      (6, 'Carlos Paciente', '666.666.666-66', '1960-01-10', true),
                                                                                      (7, 'Ana Doente', '777.777.777-77', '1988-12-25', true),
                                                                                      (8, 'Pedro Quebrado', '888.888.888-88', '2010-06-30', true),
                                                                                      (9, 'Julia Febre', '999.999.999-99', '2015-09-09', true);


-- Endereços
INSERT INTO endereco (cidade, estado, logradouro, numero, bairro, cep, id_pessoa) VALUES
                                                                                      ('São Miguel do Oeste', 'SC', 'Rua Central', 100, 'Centro', '89900-000', 1),
                                                                                      ('Chapecó', 'SC', 'Av. Getúlio Vargas', 500, 'Centro', '89800-000', 3),
                                                                                      ('São Miguel do Oeste', 'SC', 'Rua das Flores', 42, 'Jardim', '89900-000', 6),
                                                                                      ('Maravilha', 'SC', 'Rua do Comércio', 88, 'Centro', '89874-000', 7);

-- Contatos
INSERT INTO contato (telefone, id_pessoa) VALUES
                                              ('(49) 99999-1111', 1), -- Maria
                                              ('(49) 98888-2222', 3), -- Dr. House
                                              ('(49) 97777-3333', 6),-- Carlos (Paciente)
                                              ('(49) 3622-0000', 6);  -- Carlos (Fixo)


-- Recepcionistas
INSERT INTO usuario (id_pessoa, email, senha) VALUES
                                                  (1, 'maria@vitalys.com', 'senha123'),
                                                  (2, 'joao@vitalys.com', 'senha123');

-- Profissionais
INSERT INTO usuario (id_pessoa, email, senha) VALUES
                                                  (3, 'house@vitalys.com', 'vicodin'),
                                                  (4, 'grey@vitalys.com', 'anatomy'),
                                                  (5, 'shaun@vitalys.com', 'autism');

-- Tabela Recepcionista (IDs 1 e 2)
INSERT INTO recepcionista (id_pessoa) VALUES
                                          (1),
                                          (2);

-- Tabela Profissional (IDs 3, 4 e 5) - Vinculando especialidades
INSERT INTO profissional (id_pessoa, id_departamento) VALUES
                                                           (3, 1), -- House: Clínico Geral
                                                           (4, 2), -- Grey: Pediatra
                                                           (5, 4); -- Shaun: Cardiologista

-- Tabela Paciente (IDs 6, 7, 8 e 9)
INSERT INTO paciente (id_pessoa, descricao_medica) VALUES
                                                       (6, 'Hipertenso e Diabético tipo 2'),
                                                       (7, 'Alérgica a Dipirona'),
                                                       (8, 'Histórico de fraturas'),
                                                       (9, 'Asma crônica');

-- Atendimento 1: Carlos (6) chegou, foi atendido pela Maria (1) e está AGUARDANDO na Clínica Geral (2).
INSERT INTO atendimento (data_hora, status, paciente_id_pessoa, recepcionista_id_pessoa, departamento_id_departamento, profissional_id_pessoa, motivo)
VALUES ('2025-11-18 08:00:00', 'AGUARDANDO', 6, 1, 2, NULL, 'Chegou no hospital');

-- Atendimento 2: Ana (7) está EM_ATENDIMENTO com a Dra. Grey (4) na Pediatria (3).
INSERT INTO atendimento (data_hora, status, paciente_id_pessoa, recepcionista_id_pessoa, departamento_id_departamento, profissional_id_pessoa, motivo)
VALUES ('2025-11-18 09:30:00', 'EM_ATENDIMENTO', 7, 2, 3, 4, 'Paciente com dores no peito');

-- Atendimento 3: Pedro (8) teve o atendimento FINALIZADO com Dr. House (3) na Ortopedia (4).
INSERT INTO atendimento (data_hora, status, paciente_id_pessoa, recepcionista_id_pessoa, departamento_id_departamento, profissional_id_pessoa, motivo)
VALUES ('2025-11-17 14:00:00', 'FINALIZADO', 8, 1, 4, 3, 'Paciente com a perna quebrada');

-- Atendimento 4: Julia (9) foi atendida por Shaun (5), FINALIZADO e gerou internação.
INSERT INTO atendimento (data_hora, status, paciente_id_pessoa, recepcionista_id_pessoa, departamento_id_departamento, profissional_id_pessoa, motivo)
VALUES ('2025-11-15 10:00:00', 'FINALIZADO', 9, 1, 5, 5, 'Paciente com arritmia');


-- Nota para a Ana (Atendimento 2)
INSERT INTO anotacao_medica (data_hora, texto_anotacao, id_atendimento, id_departamento)
VALUES ('2025-11-18 09:45:00', 'Paciente relata dor abdominal aguda.', 2, 3);

-- Nota para o Pedro (Atendimento 3)
INSERT INTO anotacao_medica (data_hora, texto_anotacao, id_atendimento, id_departamento)
VALUES ('2025-11-17 14:15:00', 'Fratura na tíbia confirmada por Raio-X.', 3, 4);

-- Nota para a Julia (Atendimento 4 - que vai internar)
INSERT INTO anotacao_medica (data_hora, texto_anotacao, id_atendimento, id_departamento)
VALUES ('2025-11-15 10:20:00', 'Paciente com arritmia severa. Solicito internação imediata.', 4, 5);


-- Internação vinculada ao Atendimento 4
INSERT INTO internacao (data_entrada, data_saida, status, id_paciente, id_profissional, id_departamento, id_atendimento)
VALUES ('2025-11-15 10:30:00', NULL, 'ATIVA', 9, 5, 5, 4);

-- Evolução Dia 1
INSERT INTO evolucao_internacao (data_hora, texto_evolucao, id_internacao, id_profissional)
VALUES ('2025-11-16 08:00:00', 'Paciente estável, medicada com betabloqueadores.', 1, 5);

-- Evolução Dia 2 (Outro médico, Dr. House, passou visita)
INSERT INTO evolucao_internacao (data_hora, texto_evolucao, id_internacao, id_profissional)
VALUES ('2025-11-17 08:00:00', 'Apresentou leve melhora, manter observação.', 1, 3);