package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Profissional;

@Repository
abstract public class ProfissionalRepository implements JpaRepository<Profissional, Long> {
}
