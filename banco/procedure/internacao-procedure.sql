CREATE OR REPLACE PROCEDURE sp_efetivar_internacao(p_id_internacao BIGINT)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM internacao WHERE id_internacao = p_id_internacao AND status = 'SOLICITADA') THEN
        RAISE EXCEPTION 'Internação não encontrada ou status inválido (deve ser SOLICITADA).';
    END IF;

    UPDATE internacao
    SET status = 'ATIVA',
        data_entrada = CURRENT_TIMESTAMP
    WHERE id_internacao = p_id_internacao;
    
    COMMIT;
END;
$$;