package org.unoesc.backend.dto;

import org.unoesc.backend.model.Atendimento;
import org.unoesc.backend.model.Internacao;

/**
 * DTO que representa um item consolidado no histórico clínico do paciente.
 * <p>
 * Este objeto serve para agrupar um {@link Atendimento} (consulta/triagem)
 * com sua respectiva {@link Internacao}, caso ela tenha sido gerada a partir dele.
 * Facilita a visualização da linha do tempo completa no frontend.
 * </p>
 *
 * @param atendimento A entidade de atendimento (Consulta/Emergência).
 * @param internacao A internação vinculada a este atendimento (pode ser nulo se não houve internação).
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record HistoricoAtendimentoDTO(
    Atendimento atendimento, 
    Internacao internacao
) {}