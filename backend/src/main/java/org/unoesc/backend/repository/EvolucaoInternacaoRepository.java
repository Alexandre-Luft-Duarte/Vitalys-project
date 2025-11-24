package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.EvolucaoInternacao;

/**
 * Interface de acesso a dados para a entidade {@link EvolucaoInternacao}.
 * <p>
 * Gerencia o armazenamento das anotações clínicas diárias (evoluções)
 * realizadas pelos profissionais durante o período de internação.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface EvolucaoInternacaoRepository extends JpaRepository<EvolucaoInternacao, Long> {
}