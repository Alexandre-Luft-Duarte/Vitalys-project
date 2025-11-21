package org.unoesc.backend.dto;

// Um "record" é uma forma moderna e simples de criar uma classe DTO.
// Ele representa o JSON que o frontend vai enviar para criar um atendimento.
public record AtendimentoRequestDTO(
        Long pacienteId,
        Long departamentoId,
        Long profissionalId,  // Pode ser nulo, conforme RF-004
        String motivo
) {}