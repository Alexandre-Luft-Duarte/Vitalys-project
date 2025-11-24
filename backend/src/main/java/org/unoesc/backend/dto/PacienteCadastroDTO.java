package org.unoesc.backend.dto;

import java.time.LocalDate;

/**
 * DTO utilizado para receber os dados de cadastro de um novo paciente.
 * Agrupa dados pessoais, clínicos básicos, contato e endereço.
 *
 * @param nomeCompleto Nome completo do paciente.
 * @param cpf Cadastro de Pessoa Física.
 * @param dataNascimento Data de nascimento.
 * @param descricaoMedica Observações médicas iniciais ou histórico breve (opcional).
 * @param telefone Número de contato principal.
 * @param endereco Objeto contendo os dados de endereço do paciente.
 */
public record PacienteCadastroDTO(
        String nomeCompleto,
        String cpf,
        LocalDate dataNascimento,
        String descricaoMedica,
        String telefone,
        EnderecoDTO endereco
) {}