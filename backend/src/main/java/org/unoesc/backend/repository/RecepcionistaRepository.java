package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Recepcionista;

@Repository
public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Long> {
}

