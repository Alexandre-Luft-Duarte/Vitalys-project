package org.unoesc.backend.controller;

// DTO para o JSON da nova evolução diária
public record EvolucaoRequestDTO(
        String textoEvolucao,
        Long profissionalId // O profissional que está escrevendo a evolução
) {}