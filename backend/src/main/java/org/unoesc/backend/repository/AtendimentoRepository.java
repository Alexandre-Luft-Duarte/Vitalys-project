package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.*;
import java.util.List;

@Repository
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
    List<Atendimento> findByStatus(StatusAtendimento status);

    List<Atendimento> findByPacienteIdPessoa(Long pacienteId);
}

