CREATE OR REPLACE VIEW vw_resumo_departamentos AS
SELECT 
    d.nome AS departamento,
    
    -- Contagem total de atendimentos no setor
    COUNT(a.id_atendimento) AS total_geral,
    
    -- Contagem separada por status (Útil para gráficos)
    SUM(CASE WHEN a.status = 'AGUARDANDO' THEN 1 ELSE 0 END) AS fila_espera,
    SUM(CASE WHEN a.status = 'EM_ATENDIMENTO' THEN 1 ELSE 0 END) AS em_atendimento,
    SUM(CASE WHEN a.status = 'FINALIZADO' THEN 1 ELSE 0 END) AS finalizados
FROM departamento d
LEFT JOIN atendimento a ON d.id_departamento = a.departamento_id_departamento
GROUP BY d.id_departamento, d.nome;