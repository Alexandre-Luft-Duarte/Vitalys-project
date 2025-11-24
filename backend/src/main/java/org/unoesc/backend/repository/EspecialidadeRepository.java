package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Especialidade;

/**
 * Interface de acesso a dados para a entidade {@link Especialidade}.
 * <p>
 * Gerencia o catálogo de especialidades médicas disponíveis no hospital.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {
}