package org.unoesc.backend.dto;

import java.time.LocalDate;

import org.unoesc.backend.model.Paciente;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * DTO otimizado para listagens de pacientes (ex: Dashboard, Telas de Busca).
 * Contém apenas as informações essenciais para identificação rápida.
 *
 * @param id Identificador único do paciente.
 * @param nome Nome completo.
 * @param cpf CPF formatado.
 * @param matricula Código de identificação interna fictício gerado a partir do ID.
 * @param dataNascimento Data de nascimento formatada (dd/MM/yyyy).
 */
public record PacienteListagemDTO(
        Long id,
        String nome,
        String cpf,
        String matricula,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataNascimento
) {
    /**
     * Construtor auxiliar que converte uma Entidade {@link Paciente} diretamente para este DTO.
     * Gera a matrícula automaticamente baseada no ID.
     *
     * @param paciente Entidade Paciente a ser convertida.
     */
    public PacienteListagemDTO(Paciente paciente) {
        this(
                paciente.getIdPessoa(),
                paciente.getNomeCompleto(),
                paciente.getCpf(),
                "P" + String.format("%03d", paciente.getIdPessoa()), // Gera matrícula (ex: P005)
                paciente.getDataNascimento()
        );
    }
}