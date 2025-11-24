package org.unoesc.backend.dto;

/**
 * DTO para o registro de anotações médicas (Anamnese, observações gerais).
 * Utilizado na tela de atendimento clínico.
 *
 * @param textoAnotacao O conteúdo textual da anotação médica.
 * @param profissionalId O ID do médico ou enfermeiro que está registrando a nota.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record AnotacaoRequestDTO(
        String textoAnotacao,
        Long profissionalId
) {}