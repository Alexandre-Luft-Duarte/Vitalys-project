CREATE OR REPLACE VIEW vw_relatorio_atendimentos AS
SELECT 
    a.id_atendimento,
    a.data_hora,
    a.status,
    a.motivo,
    d.nome AS departamento,
    pessoa_pac.nome_completo AS nome_paciente,
    pessoa_prof.nome_completo AS nome_profissional
FROM atendimento a
JOIN paciente pac ON a.paciente_id_pessoa = pac.id_pessoa
JOIN pessoa pessoa_pac ON pac.id_pessoa = pessoa_pac.id_pessoa
LEFT JOIN profissional prof ON a.profissional_id_pessoa = prof.id_pessoa
LEFT JOIN usuario user_prof ON prof.id_pessoa = user_prof.id_pessoa
LEFT JOIN pessoa pessoa_prof ON user_prof.id_pessoa = pessoa_prof.id_pessoa
LEFT JOIN departamento d ON a.departamento_id_departamento = d.id_departamento;