CREATE OR REPLACE FUNCTION fn_check_internacao() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'FINALIZADA' AND NEW.data_entrada IS NULL THEN
        RAISE EXCEPTION 'Não é possível dar alta (FINALIZADA) em uma internação que não possui data de entrada.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_internacao_dates
BEFORE UPDATE ON internacao
FOR EACH ROW EXECUTE FUNCTION fn_check_internacao();