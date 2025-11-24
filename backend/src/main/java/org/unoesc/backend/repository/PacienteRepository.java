package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Paciente;

/**
 * Interface de acesso a dados para a entidade {@link Paciente}.
 * <p>
 * Responsável pelas operações de CRUD (Create, Read, Update, Delete)
 * relacionadas aos pacientes do hospital.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}