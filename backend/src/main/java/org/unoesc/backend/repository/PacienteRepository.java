package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Paciente;

@Repository
abstract public class PacienteRepository implements JpaRepository<Paciente, Long> {
}

