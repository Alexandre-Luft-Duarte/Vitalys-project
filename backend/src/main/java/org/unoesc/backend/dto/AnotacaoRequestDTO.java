package org.unoesc.backend.dto;

public record AnotacaoRequestDTO(
        String textoAnotacao,
        Long profissionalId // O profissional que está escrevendo a nota
) {}