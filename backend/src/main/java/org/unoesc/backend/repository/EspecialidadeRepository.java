package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Especialidade;

@Repository
abstract public class EspecialidadeRepository implements JpaRepository<Especialidade, Long> {
}

