package org.unoesc.backend.controller;

public record AnotacaoRequestDTO(
        String textoAnotacao,
        Long profissionalId // O profissional que está escrevendo a nota
) {}