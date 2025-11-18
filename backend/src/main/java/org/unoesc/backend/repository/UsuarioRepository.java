package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Usuario;

@Repository
abstract public class UsuarioRepository implements JpaRepository<Usuario, Long> {
}
