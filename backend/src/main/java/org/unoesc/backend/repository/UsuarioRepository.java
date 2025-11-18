package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // O Spring cria o SQL automaticamente: SELECT * FROM usuario WHERE email = ?
    Optional<Usuario> findByEmail(String email);
}