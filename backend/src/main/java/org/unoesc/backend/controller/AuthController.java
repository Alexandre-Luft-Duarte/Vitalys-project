package org.unoesc.backend.controller;

import org.unoesc.backend.dto.LoginRequestDTO;
import org.unoesc.backend.dto.LoginResponseDTO;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.Recepcionista;
import org.unoesc.backend.model.Usuario;
import org.unoesc.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDTO loginRequest) {

        // 1. Buscar usuário pelo E-mail
        // O findByEmail vai buscar na tabela 'usuario' e, graças ao JOINED,
        // o JPA já traz os dados se ele for Profissional ou Recepcionista.
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.email())
                .orElse(null);

        // 2. Verificações Básicas
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail não encontrado.");
        }

        // (Nota: Em produção usaríamos BCrypt para comparar hash, mas para o MVP texto puro funciona)
        if (!usuario.getSenha().equals(loginRequest.senha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        }

        if (!usuario.getStatusAtivo()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inativo no sistema.");
        }

        // 3. Identificar o Tipo de Usuário (Polimorfismo)
        String tipoUsuario = "USUARIO";

        if (usuario instanceof Profissional) {
            tipoUsuario = "PROFISSIONAL";
        } else if (usuario instanceof Recepcionista) {
            tipoUsuario = "RECEPCIONISTA";
        }

        // 4. Montar a resposta de sucesso
        LoginResponseDTO response = new LoginResponseDTO(
                usuario.getIdPessoa(), // Lembra que o ID é herdado de Pessoa
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                tipoUsuario,
                "dummy-token-123456" // Token falso por enquanto (para MVP)
        );

        return ResponseEntity.ok(response);
    }

    /**
     * RF-002: Logout
     * Como nossa autenticação por enquanto é "stateless" (não criamos sessão no servidor),
     * o logout é apenas uma ação no Frontend (apagar o usuário da memória).
     * Mas deixamos o endpoint aqui para cumprir o requisito formalmente.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }
}