package org.unoesc.backend.dto;

/**
 * DTO utilizado para receber a solicitação de criação de uma nova internação.
 * Contém os identificadores necessários para vincular o paciente ao profissional responsável.
 *
 * @param pacienteId ID do paciente que será internado.
 * @param profissionalId ID do profissional responsável pela internação.
 * @param atendimentoId ID do atendimento de origem.
 * @param departamentoId ID do departamento onde ocorrerá a internação.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record InternacaoRequestDTO(
        Long pacienteId,
        Long profissionalId,
        Long atendimentoId,
        Long departamentoId
) {}