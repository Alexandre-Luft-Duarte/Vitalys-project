package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Departamento;

@Repository
abstract public class DepartamentoRepository implements JpaRepository<Departamento, Long> {
}

