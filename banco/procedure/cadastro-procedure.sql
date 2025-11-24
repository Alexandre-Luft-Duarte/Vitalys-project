CREATE OR REPLACE PROCEDURE sp_cadastrar_paciente(
    p_nome VARCHAR, p_cpf VARCHAR, p_nasc DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_pessoa BIGINT;
BEGIN
    -- Insere na tabela pai
    INSERT INTO pessoa (nome_completo, cpf, data_nascimento, status_ativo)
    VALUES (p_nome, p_cpf, p_nasc, true)
    RETURNING id_pessoa INTO v_id_pessoa;

    -- Insere na tabela filha
    INSERT INTO paciente (id_pessoa) VALUES (v_id_pessoa);
    
    COMMIT;
END;
$$;