CREATE TABLE log_status_atendimento (
    id_log SERIAL PRIMARY KEY,
    id_atendimento BIGINT,
    status_anterior VARCHAR(50),
    status_novo VARCHAR(50),
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_banco VARCHAR(100)
);

CREATE OR REPLACE FUNCTION fn_log_status() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO log_status_atendimento (id_atendimento, status_anterior, status_novo, usuario_banco)
        VALUES (NEW.id_atendimento, OLD.status, NEW.status, CURRENT_USER);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_atendimento
AFTER UPDATE ON atendimento
FOR EACH ROW EXECUTE FUNCTION fn_log_status();