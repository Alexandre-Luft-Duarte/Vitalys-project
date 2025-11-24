package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Departamento;

/**
 * Interface de acesso a dados para a entidade {@link Departamento}.
 * <p>
 * Gerencia a estrutura organizacional do hospital (ex: Emergência, UTI, Pediatria).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
}