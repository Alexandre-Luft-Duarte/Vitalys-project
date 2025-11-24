package org.unoesc.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unoesc.backend.dto.LoginRequestDTO;
import org.unoesc.backend.dto.LoginResponseDTO;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.Recepcionista;
import org.unoesc.backend.model.Usuario;
import org.unoesc.backend.repository.UsuarioRepository;

/**
 * Controlador responsável pela autenticação e controle de acesso dos usuários.
 * Gerencia o login e logout (simulado).
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Realiza o login de um usuário no sistema.
     * Verifica email, senha e status ativo, retornando o perfil de acesso adequado.
     *
     * @param loginRequest DTO contendo email e senha.
     * @return Retorna os dados do usuário e token (simulado) em caso de sucesso,
     * ou status 401 (Unauthorized) / 403 (Forbidden) em caso de falha.
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDTO loginRequest) {

        Usuario usuario = usuarioRepository.findByEmail(loginRequest.email())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail não encontrado.");
        }

        // Validação de senha simples (MVP)
        if (!usuario.getSenha().equals(loginRequest.senha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        }

        if (!usuario.getStatusAtivo()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inativo no sistema.");
        }

        String tipoUsuario = "USUARIO";
        if (usuario instanceof Profissional) {
            tipoUsuario = "PROFISSIONAL";
        } else if (usuario instanceof Recepcionista) {
            tipoUsuario = "RECEPCIONISTA";
        }

        LoginResponseDTO response = new LoginResponseDTO(
                usuario.getIdPessoa(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                tipoUsuario,
                "dummy-token"
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Realiza o logout do usuário.
     * Como a autenticação atual é stateless, este endpoint serve apenas para
     * fins de auditoria ou invalidação futura de tokens.
     *
     * @return Status 200 (OK).
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
}