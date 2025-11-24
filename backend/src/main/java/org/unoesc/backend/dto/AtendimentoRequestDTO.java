package org.unoesc.backend.dto;

/**
 * DTO utilizado pela recepção para registrar um novo atendimento (Triagem/Entrada).
 *
 * @param pacienteId ID do paciente que receberá o atendimento.
 * @param departamentoId ID do departamento de destino (ex: Triagem, Emergência).
 * @param profissionalId ID do médico preferencial (opcional).
 * @param recepcionistaId ID do recepcionista que está abrindo o atendimento.
 * @param motivo Breve descrição do motivo da visita ou queixa principal.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record AtendimentoRequestDTO(
        Long pacienteId,
        Long departamentoId,
        Long profissionalId,
        Long recepcionistaId,
        String motivo
) {}