package org.unoesc.backend.dto;

// Devolvemos o básico e o "tipo" para o front saber se abre a tela de médico ou recepção
public record LoginResponseDTO(
        Long id,
        String nome,
        String email,
        String tipoUsuario, // "PROFISSIONAL" ou "RECEPCIONISTA"
        String token // (Opcional para o futuro, por enquanto pode ir null)
) {
}