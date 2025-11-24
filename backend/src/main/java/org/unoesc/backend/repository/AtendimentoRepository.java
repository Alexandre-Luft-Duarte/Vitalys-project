package org.unoesc.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.unoesc.backend.model.Atendimento;
import org.unoesc.backend.model.StatusAtendimento;

/**
 * Interface de acesso a dados para a entidade {@link Atendimento}.
 * <p>
 * Gerencia todas as operações de banco de dados relacionadas ao fluxo de atendimento,
 * permitindo filtrar filas de espera, consultar históricos e filtrar por departamento.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Repository
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    /**
     * Busca uma lista de atendimentos filtrada pelo status atual.
     * Utilizado principalmente para alimentar o Dashboard (ex: listar quem está AGUARDANDO).
     *
     * @param status O estado do atendimento desejado.
     * @return Lista de atendimentos com aquele status.
     */
    List<Atendimento> findByStatus(StatusAtendimento status);

    /**
     * Recupera todo o histórico de atendimentos de um paciente específico.
     * Utilizado para a funcionalidade de visualização de prontuário/histórico completo.
     *
     * @param pacienteId O ID (Primary Key) do paciente (Pessoa).
     * @return Lista de todos os atendimentos vinculados àquele paciente.
     */
    List<Atendimento> findByPacienteIdPessoa(Long pacienteId);

    /**
     * Busca todos os atendimentos vinculados a um departamento específico.
     * Útil para filtrar filas de espera por setor (ex: fila da Emergência vs fila da Pediatria).
     *
     * @param departamentoId O ID do departamento.
     * @return Lista de atendimentos daquele departamento.
     */
    List<Atendimento> findByDepartamentoIdDepartamento(Long departamentoId);

    /**
     * Recupera atendimentos de um paciente filtrados por um status específico.
     * Útil para separar, por exemplo, atendimentos finalizados (histórico consolidado)
     * de atendimentos em andamento.
     *
     * @param pacienteId O ID do paciente.
     * @param status O status desejado (ex: FINALIZADO).
     * @return Lista de atendimentos do paciente naquele status.
     */
    List<Atendimento> findByPacienteIdPessoaAndStatus(Long pacienteId, StatusAtendimento status);
}