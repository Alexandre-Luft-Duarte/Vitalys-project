package org.unoesc.backend.dto;

import java.time.LocalDate;

/**
 * DTO unificado para o cadastro de usuários do sistema (Profissionais e Recepcionistas).
 *
 * @param nomeCompleto Nome completo do usuário.
 * @param cpf CPF do usuário.
 * @param dataNascimento Data de nascimento.
 * @param email Email utilizado para login.
 * @param senha Senha de acesso.
 * @param tipoUsuario Define o perfil: "PROFISSIONAL" ou "RECEPCIONISTA".
 * @param departamentoId ID do departamento (obrigatório apenas para Profissionais).
 * @param telefone Telefone de contato.
 * @param endereco Endereço residencial.
 */
public record UsuarioCadastroDTO(
        String nomeCompleto,
        String cpf,
        LocalDate dataNascimento,
        String email,
        String senha,
        String tipoUsuario,
        Long departamentoId,
        String telefone,
        String endereco
) {}