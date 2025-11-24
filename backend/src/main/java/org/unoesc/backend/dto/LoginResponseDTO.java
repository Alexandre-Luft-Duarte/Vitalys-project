package org.unoesc.backend.dto;

/**
 * DTO retornado após uma autenticação bem-sucedida.
 * Contém informações básicas do usuário e seu perfil de acesso.
 *
 * @param id Identificador do usuário.
 * @param nome Nome completo para exibição.
 * @param email E-mail do usuário.
 * @param tipoUsuario Perfil de acesso ("PROFISSIONAL" ou "RECEPCIONISTA").
 * @param token Token de autenticação (JWT) para requisições futuras (opcional).
 */
public record LoginResponseDTO(
        Long id,
        String nome,
        String email,
        String tipoUsuario,
        String token
) {
}