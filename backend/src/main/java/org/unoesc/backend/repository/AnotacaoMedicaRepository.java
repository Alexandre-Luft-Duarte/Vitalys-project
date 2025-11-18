package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.AnotacaoMedica;

@Repository
public interface AnotacaoMedicaRepository extends JpaRepository<AnotacaoMedica, Long> {
}

