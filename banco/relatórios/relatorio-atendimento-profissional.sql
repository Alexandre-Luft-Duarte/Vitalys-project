CREATE OR REPLACE VIEW vw_atendimentos_por_profissional AS
SELECT 
    pe_prof.nome_completo AS nome_profissional,
    pe_prof.id_pessoa AS id_profissional,
    d.nome AS departamento_atuacao,
    
    a.id_atendimento,
    a.data_hora,
    a.status,
    
    pe_pac.nome_completo AS nome_paciente,
    a.motivo
FROM atendimento a
JOIN profissional prof ON a.profissional_id_pessoa = prof.id_pessoa
JOIN usuario u_prof ON prof.id_pessoa = u_prof.id_pessoa
JOIN pessoa pe_prof ON u_prof.id_pessoa = pe_prof.id_pessoa
JOIN departamento d ON prof.id_departamento = d.id_departamento
JOIN paciente pac ON a.paciente_id_pessoa = pac.id_pessoa
JOIN pessoa pe_pac ON pac.id_pessoa = pe_pac.id_pessoa
ORDER BY pe_prof.nome_completo, a.data_hora DESC;