package org.unoesc.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Usuario;

/**
 * Interface de acesso a dados para a entidade {@link Usuario}.
 * <p>
 * Centraliza as operações relacionadas a autenticação e credenciais,
 * abrangendo tanto Profissionais quanto Recepcionistas (devido à herança).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 * @see org.springframework.data.jpa.repository.JpaRepository
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca um usuário específico pelo seu endereço de e-mail.
     * Utilizado principalmente durante o processo de login para validar credenciais.
     *
     * @param email O e-mail cadastrado do usuário.
     * @return Um {@link Optional} contendo o usuário se encontrado, ou vazio caso contrário.
     */
    Optional<Usuario> findByEmail(String email);
}