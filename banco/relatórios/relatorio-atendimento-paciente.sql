CREATE OR REPLACE VIEW vw_historico_atendimentos_paciente AS
SELECT 
    a.id_atendimento,
    a.data_hora AS data_atendimento,
    a.status,
    a.motivo AS queixa_principal,
    
    pac.id_pessoa AS id_paciente,
    pe_pac.nome_completo AS nome_paciente,
    pe_pac.cpf AS cpf_paciente,
    
    pe_prof.nome_completo AS nome_profissional,
    esp.nome AS especialidade,
    
    d.nome AS departamento
FROM atendimento a
JOIN paciente pac ON a.paciente_id_pessoa = pac.id_pessoa
JOIN pessoa pe_pac ON pac.id_pessoa = pe_pac.id_pessoa
LEFT JOIN profissional prof ON a.profissional_id_pessoa = prof.id_pessoa
LEFT JOIN usuario u_prof ON prof.id_pessoa = u_prof.id_pessoa
LEFT JOIN pessoa pe_prof ON u_prof.id_pessoa = pe_prof.id_pessoa
LEFT JOIN especialidade esp ON prof.id_especialidade = esp.id_especialidade
LEFT JOIN departamento d ON a.departamento_id_departamento = d.id_departamento;