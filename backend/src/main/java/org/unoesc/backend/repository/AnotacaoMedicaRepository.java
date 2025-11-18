package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.AnotacaoMedica;

@Repository
abstract public class AnotacaoMedicaRepository implements JpaRepository<AnotacaoMedica, Long> {
}

