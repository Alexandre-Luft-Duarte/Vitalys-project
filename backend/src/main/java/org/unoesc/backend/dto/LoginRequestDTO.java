package org.unoesc.backend.dto;

/**
 * DTO contendo as credenciais para autenticação no sistema.
 *
 * @param email E-mail cadastrado.
 * @param senha Senha de acesso.
 */
public record LoginRequestDTO(String email, String senha) {
}