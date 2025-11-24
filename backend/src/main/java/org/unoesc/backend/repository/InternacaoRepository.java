package org.unoesc.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Internacao;
import org.unoesc.backend.model.StatusInternacao;

/**
 * Interface de acesso a dados para a entidade {@link Internacao}.
 * <p>
 * Gerencia o ciclo de vida das internações, desde a solicitação inicial
 * até a alta médica (finalização).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface InternacaoRepository extends JpaRepository<Internacao, Long> {

    /**
     * Recupera uma lista de internações filtradas pelo seu status atual.
     * Útil para dashboards que mostram apenas leitos ocupados (ATIVA) ou solicitações pendentes (SOLICITADA).
     *
     * @param status O estado da internação desejado.
     * @return Lista de internações correspondentes.
     */
    List<Internacao> findByStatus(StatusInternacao status);

    /**
     * Recupera todo o histórico de internações de um determinado paciente.
     *
     * @param pacienteId O ID (Primary Key) do paciente.
     * @return Lista de internações vinculadas àquele paciente.
     */
    List<Internacao> findByPacienteIdPessoa(Long pacienteId);
}