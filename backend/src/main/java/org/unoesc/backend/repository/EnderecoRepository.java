package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Endereco;

/**
 * Interface de acesso a dados para a entidade {@link Endereco}.
 * <p>
 * Gerencia os dados de localização de pacientes e usuários.
 * Geralmente acessado em cascata através das entidades principais.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}