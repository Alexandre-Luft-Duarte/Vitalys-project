package org.unoesc.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.EvolucaoRequestDTO;
import org.unoesc.backend.dto.InternacaoRequestDTO;
import org.unoesc.backend.model.Atendimento;
import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.model.EvolucaoInternacao;
import org.unoesc.backend.model.Internacao;
import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.StatusAtendimento;
import org.unoesc.backend.model.StatusInternacao;
import org.unoesc.backend.repository.AtendimentoRepository;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.unoesc.backend.repository.EvolucaoInternacaoRepository;
import org.unoesc.backend.repository.InternacaoRepository;
import org.unoesc.backend.repository.PacienteRepository;
import org.unoesc.backend.repository.ProfissionalRepository;

/**
 * Controlador responsável pelo gerenciamento de internações.
 * <p>
 * Controla todo o ciclo de vida da internação: Solicitação, Admissão (Ativa),
 * Registro de Evoluções Clínicas e Alta Médica (Finalização).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/internacoes")
public class InternacaoController {

    @Autowired private InternacaoRepository internacaoRepository;
    @Autowired private EvolucaoInternacaoRepository evolucaoRepository;
    @Autowired private PacienteRepository pacienteRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private AtendimentoRepository atendimentoRepository;
    @Autowired private DepartamentoRepository departamentoRepository;

    /**
     * Solicita e inicia uma nova internação (UC-05 Fluxo 1).
     * <p>
     * Cria um registro de internação com status ATIVA, define a data de entrada
     * e finaliza o atendimento de origem (consulta) automaticamente.
     * </p>
     *
     * @param request DTO contendo IDs do paciente, profissional, atendimento origem e departamento.
     * @return A nova internação criada com status ATIVA.
     * @throws ResponseStatusException Se alguma entidade vinculada não for encontrada.
     */
    @PostMapping
    public ResponseEntity<Internacao> solicitarInternacao(@RequestBody InternacaoRequestDTO request) {

        // 1. Buscar as entidades
        Paciente paciente = pacienteRepository.findById(request.pacienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado"));

        Profissional profissional = profissionalRepository.findById(request.profissionalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));

        Atendimento atendimento = atendimentoRepository.findById(request.atendimentoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        Departamento departamento = departamentoRepository.findById(request.departamentoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado"));

        // 2. Criar nova Internacao
        Internacao novaInternacao = new Internacao();
        novaInternacao.setPaciente(paciente);
        novaInternacao.setProfissional(profissional);
        novaInternacao.setDepartamento(departamento);
        novaInternacao.setAtendimento(atendimento);
        novaInternacao.setDataEntrada(LocalDateTime.now());
        novaInternacao.setStatus(StatusInternacao.ATIVA);

        // Finaliza o atendimento de origem conforme regra de negócio (UC-04)
        atendimento.setStatus(StatusAtendimento.FINALIZADO);
        
        // 3. Salvar
        Internacao internacaoSalva = internacaoRepository.save(novaInternacao);

        return ResponseEntity.status(HttpStatus.CREATED).body(internacaoSalva);
    }

    /**
     * Registra a alta médica de um paciente (UC-05 Fluxo 2).
     * Muda o status para FINALIZADA e preenche a data de saída.
     *
     * @param id Identificador da internação.
     * @return Internação atualizada.
     */
    @PutMapping("/{id}/registrar-alta")
    public ResponseEntity<Internacao> registrarAlta(@PathVariable Long id) {
        Internacao internacao = internacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Internação não encontrada"));

        internacao.setStatus(StatusInternacao.FINALIZADA);
        internacao.setDataSaida(LocalDateTime.now()); // Registra a data/hora da alta

        Internacao internacaoAtualizada = internacaoRepository.save(internacao);
        return ResponseEntity.ok(internacaoAtualizada);
    }

    /**
     * Adiciona uma evolução clínica (anotação diária) a uma internação em andamento.
     *
     * @param id Identificador da internação.
     * @param request DTO contendo o texto da evolução e o ID do profissional.
     * @return A evolução criada.
     */
    @PostMapping("/{id}/evolucoes")
    public ResponseEntity<EvolucaoInternacao> adicionarEvolucao(
            @PathVariable Long id,
            @RequestBody EvolucaoRequestDTO request) {

        Internacao internacao = internacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Internação não encontrada"));

        Profissional profissional = profissionalRepository.findById(request.profissionalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));

        EvolucaoInternacao novaEvolucao = new EvolucaoInternacao();
        novaEvolucao.setTextoEvolucao(request.textoEvolucao());
        novaEvolucao.setDataHora(LocalDateTime.now());
        novaEvolucao.setInternacao(internacao); // Associa à internação
        novaEvolucao.setProfissional(profissional);

        EvolucaoInternacao evolucaoSalva = evolucaoRepository.save(novaEvolucao);
        return ResponseEntity.status(HttpStatus.CREATED).body(evolucaoSalva);
    }

    /**
     * Lista apenas as internações que estão atualmente ativas (ocupando leito).
     *
     * @return Lista de internações com status ATIVA.
     */
    @GetMapping("/ativas")
    public ResponseEntity<List<Internacao>> listarInternacoesAtivas() {
        List<Internacao> internacoes = internacaoRepository.findByStatus(StatusInternacao.ATIVA);
        return ResponseEntity.ok(internacoes);
    }

    /**
     * Lista todas as internações registradas no sistema (histórico completo).
     *
     * @return Lista de todas as internações.
     */
    @GetMapping
    public ResponseEntity<List<Internacao>> listarInternacoes() {
        List<Internacao> internacoes = internacaoRepository.findAll();
        return ResponseEntity.ok(internacoes);
    }

    /**
     * Busca o histórico de internações de um paciente específico.
     *
     * @param pacienteId ID do paciente.
     * @return Lista de internações daquele paciente.
     */
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Internacao>> getHistoricoInternacoesPaciente(@PathVariable Long pacienteId) {
        List<Internacao> historico = internacaoRepository.findByPacienteIdPessoa(pacienteId);
        return ResponseEntity.ok(historico);
    }
}