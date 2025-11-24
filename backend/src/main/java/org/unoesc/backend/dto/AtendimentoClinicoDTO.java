package org.unoesc.backend.dto;

import java.time.LocalDate;

/**
 * DTO detalhado para a tela de Atendimento Clínico (Prontuário).
 * Agrupa dados do atendimento e dados demográficos do paciente em um único objeto.
 *
 * @param idAtendimento ID do atendimento atual.
 * @param status Status do atendimento.
 * @param idPessoa ID do paciente (Pessoa).
 * @param nomeCompleto Nome completo do paciente.
 * @param cpf CPF do paciente.
 * @param idade Idade calculada do paciente.
 * @param dataNascimento Data de nascimento do paciente.
 * @param idProfissional ID do profissional vinculado (se houver).
 * @param idDepartamento ID do departamento onde o atendimento está ocorrendo.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record AtendimentoClinicoDTO(
    Long idAtendimento,
    String status,
    Long idPessoa,
    String nomeCompleto,
    String cpf,
    Integer idade,
    LocalDate dataNascimento,
    Long idProfissional,
    Long idDepartamento
) {}