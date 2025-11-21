package org.unoesc.backend.dto;

import java.time.LocalDateTime;

public record FilaAtendimentosDTO(
    Long idAtendimento,
    String nomePaciente,
    LocalDateTime dataHora,
    String motivo,
    String status
) {}