package org.unoesc.backend.dto;

/**
 * DTO utilizado para registrar a evolução clínica diária de um paciente internado.
 *
 * @param textoEvolucao Descrição da evolução do quadro clínico.
 * @param profissionalId O ID do profissional que realizou a avaliação.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record EvolucaoRequestDTO(
        String textoEvolucao,
        Long profissionalId
) {}