CREATE OR REPLACE VIEW vw_pacientes_ativos AS
SELECT 
    p.id_pessoa AS id_paciente,
    pe.nome_completo,
    pe.cpf,
    pe.data_nascimento,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, pe.data_nascimento)) AS idade,
    p.descricao_medica,
    (SELECT c.telefone FROM contato c WHERE c.id_pessoa = p.id_pessoa LIMIT 1) AS telefone_principal
FROM paciente p
JOIN pessoa pe ON p.id_pessoa = pe.id_pessoa
WHERE pe.status_ativo = true;