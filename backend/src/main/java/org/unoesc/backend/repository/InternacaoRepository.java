package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Internacao;
import org.unoesc.backend.model.StatusInternacao;
import java.util.List;

@Repository
public interface InternacaoRepository extends JpaRepository<Internacao, Long> {
    List<Internacao> findByStatus(StatusInternacao status);

    List<Internacao> findByPacienteIdPessoa(Long pacienteId);
}

