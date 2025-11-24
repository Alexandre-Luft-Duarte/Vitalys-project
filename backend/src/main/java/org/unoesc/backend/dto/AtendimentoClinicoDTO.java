package org.unoesc.backend.dto;

import java.time.LocalDate;

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