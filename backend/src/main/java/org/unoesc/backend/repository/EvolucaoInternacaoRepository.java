package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.EvolucaoInternacao;

@Repository
public interface EvolucaoInternacaoRepository extends JpaRepository<EvolucaoInternacao, Long> {
}
