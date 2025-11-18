package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Contato;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
}
