package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Pessoa;

@Repository
abstract public class PessoaRepository implements JpaRepository<Pessoa, Long> {
}
