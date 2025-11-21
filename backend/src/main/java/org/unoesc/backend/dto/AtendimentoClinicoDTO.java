package org.unoesc.backend.dto;
 
import java.time.LocalDate;
 
public record AtendimentoClinicoDTO(
    Long idAtendimento,
    String status,
    Long idPaciente,
    String nomePaciente,
    String cpf,
    Integer idade,
    LocalDate dataNascimento,
    String motivo
) {}