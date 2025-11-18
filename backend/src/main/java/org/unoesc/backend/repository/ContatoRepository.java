package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Contato;

@Repository
abstract public class ContatoRepository implements JpaRepository<Contato, Long> {
}
