package org.unoesc.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.unoesc.backend.model.Paciente;
import java.time.LocalDate;

public record PacienteListagemDTO(
        Long id,
        String nome,
        String cpf,
        String matricula, // Campo calculado (Fictício para o MVP)

        @JsonFormat(pattern = "dd/MM/yyyy") // Formata a data para "15/03/1985"
        LocalDate dataNascimento
) {
    // Construtor auxiliar que recebe a Entidade e preenche o DTO
    public PacienteListagemDTO(Paciente paciente) {
        this(
                paciente.getIdPessoa(),      // Mapeia idPessoa -> id
                paciente.getNomeCompleto(),  // Mapeia nomeCompleto -> nome
                paciente.getCpf(),

                // Gera uma matrícula fictícia baseada no ID (Ex: ID 5 vira "P005")
                "P" + String.format("%03d", paciente.getIdPessoa()),

                paciente.getDataNascimento()
        );
    }
}