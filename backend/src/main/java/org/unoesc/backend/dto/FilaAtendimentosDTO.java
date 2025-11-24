package org.unoesc.backend.dto;

import java.time.LocalDateTime;

/**
 * DTO otimizado para a listagem da fila de espera no Dashboard.
 * Contém apenas os dados essenciais para visualização rápida da fila.
 *
 * @param idAtendimento Identificador único do atendimento.
 * @param nomePaciente Nome completo do paciente.
 * @param dataHora Data e hora da chegada/abertura do atendimento.
 * @param motivo Motivo da visita (Queixa).
 * @param status Status atual (AGUARDANDO, EM_ATENDIMENTO, FINALIZADO).
 * @param nomeProfissional Nome do profissional de saúde alocado (se houver).
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record FilaAtendimentosDTO(
    Long idAtendimento,
    String nomePaciente,
    LocalDateTime dataHora,
    String motivo,
    String status,
    String nomeProfissional
) {}