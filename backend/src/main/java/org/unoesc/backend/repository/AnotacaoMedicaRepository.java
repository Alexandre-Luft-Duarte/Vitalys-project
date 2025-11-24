package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.AnotacaoMedica;

/**
 * Interface de acesso a dados para a entidade {@link AnotacaoMedica}.
 * <p>
 * Responsável por persistir os registros clínicos textuais (anamnese, prescrições, evoluções)
 * realizados durante os atendimentos.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface AnotacaoMedicaRepository extends JpaRepository<AnotacaoMedica, Long> {
}