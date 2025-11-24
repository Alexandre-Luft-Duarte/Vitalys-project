package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Contato;

/**
 * Interface de acesso a dados para a entidade {@link Contato}.
 * <p>
 * Gerencia os dados de contato (telefones, e-mails secundários) vinculados
 * às pessoas cadastradas no sistema.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
}