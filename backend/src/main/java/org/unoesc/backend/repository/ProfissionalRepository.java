package org.unoesc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Profissional;

/**
 * Interface de acesso a dados para a entidade {@link Profissional}.
 * <p>
 * Gerencia os dados de médicos, enfermeiros e demais profissionais de saúde,
 * incluindo suas associações com departamentos.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

    /**
     * Busca um profissional específico pelo ID da Pessoa associada.
     * Útil quando se tem o ID genérico de usuário/pessoa e deseja-se recuperar
     * os dados específicos do profissional (como CRM ou Departamento).
     *
     * @param idPessoa O identificador único da pessoa.
     * @return O profissional encontrado ou null.
     */
    Profissional findByIdPessoa(Long idPessoa);
}