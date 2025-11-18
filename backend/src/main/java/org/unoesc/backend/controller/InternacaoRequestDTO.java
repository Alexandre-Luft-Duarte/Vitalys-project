package org.unoesc.backend.controller;

// DTO para o JSON que o frontend enviará para criar uma internação.
// Baseado nos campos da sua classe Internacao.java
public record InternacaoRequestDTO(
        Long pacienteId,
        Long profissionalId
) {}