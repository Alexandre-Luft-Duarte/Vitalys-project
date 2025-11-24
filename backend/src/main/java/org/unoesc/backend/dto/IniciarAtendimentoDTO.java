package org.unoesc.backend.dto;

/**
 * DTO utilizado para a ação de iniciar um atendimento.
 * Vincula o profissional ao atendimento no momento da chamada.
 *
 * @param idProfissional O ID do profissional que está chamando o paciente.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record IniciarAtendimentoDTO(Long idProfissional) {
}