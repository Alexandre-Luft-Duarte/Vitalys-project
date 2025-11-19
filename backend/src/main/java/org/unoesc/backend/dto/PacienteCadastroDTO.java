package org.unoesc.backend.dto;

import java.time.LocalDate;

public record PacienteCadastroDTO(
        // Dados Pessoais
        String nomeCompleto,
        String cpf,
        LocalDate dataNascimento,

        // Opcional
        String descricaoMedica,

        // Contato (Simplificado na raiz, já que é só um campo)
        String telefone,

        // Endereço (Objeto aninhado)
        EnderecoDTO endereco
) {}