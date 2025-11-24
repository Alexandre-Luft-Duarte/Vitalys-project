package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Pessoa;

/**
 * Interface de acesso a dados para a entidade base {@link Pessoa}.
 * <p>
 * Fornece métodos para consultas genéricas sobre qualquer indivíduo cadastrado
 * no sistema (seja paciente, médico ou recepcionista).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}