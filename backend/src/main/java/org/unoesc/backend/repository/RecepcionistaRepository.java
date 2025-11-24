package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Recepcionista;

/**
 * Interface de acesso a dados para a entidade {@link Recepcionista}.
 * <p>
 * Gerencia os dados dos usuários responsáveis pelo atendimento inicial e
 * triagem administrativa.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Long> {
}