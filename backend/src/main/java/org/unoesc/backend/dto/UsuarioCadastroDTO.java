package org.unoesc.backend.dto;

import java.time.LocalDate;

public record UsuarioCadastroDTO(
        // Dados de Pessoa/Usuario
        String nomeCompleto,
        String cpf,
        LocalDate dataNascimento,
        String email,
        String senha,

        // Define o que estamos criando
        String tipoUsuario, // "PROFISSIONAL" ou "RECEPCIONISTA"

        // Específico para Profissional (pode ser nulo se for Recepcionista)
        Long departamentoId,

        // Opcionais de contato
        String telefone,

        // Opcionais de contato
        String endereco
) {}