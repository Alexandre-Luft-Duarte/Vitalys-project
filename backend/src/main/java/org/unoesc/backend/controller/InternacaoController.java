package org.unoesc.backend.controller;

import org.unoesc.backend.dto.EvolucaoRequestDTO;
import org.unoesc.backend.dto.InternacaoRequestDTO;
import org.unoesc.backend.model.*; // Importa todas as suas entidades
import org.unoesc.backend.repository.*; // Importa todos os seus repositórios
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/internacoes")
public class InternacaoController {

    @Autowired private InternacaoRepository internacaoRepository;
    @Autowired private EvolucaoInternacaoRepository evolucaoRepository;
    @Autowired private PacienteRepository pacienteRepository;
    @Autowired private ProfissionalRepository profissionalRepository;

    /**
     * UC-05 (Fluxo 1): Solicitar Internação
     * Cria um novo registro de Internacao com status ATIVA.
     */
    @PostMapping
    public ResponseEntity<Internacao> solicitarInternacao(@RequestBody InternacaoRequestDTO request) {

        // 1. Buscar as entidades
        Paciente paciente = pacienteRepository.findById(request.pacienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado"));

        Profissional profissional = profissionalRepository.findById(request.profissionalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));

        // 2. Criar nova Internacao
        Internacao novaInternacao = new Internacao();
        novaInternacao.setPaciente(paciente);
        novaInternacao.setProfissional(profissional); // Profissional responsável pela internação
        novaInternacao.setDataEntrada(LocalDateTime.now());
        novaInternacao.setStatus(StatusInternacao.ATIVA); // Status inicial

        // 3. Salvar
        Internacao internacaoSalva = internacaoRepository.save(novaInternacao);

        // **LEMBRETE (Regra de Negócio):**
        // O UC-04 diz que após solicitar a internação, o atendimento (consulta)
        // é finalizado[cite: 148, 149]. O frontend deve, após esta chamada,
        // chamar o endpoint `PUT /api/atendimentos/{id}/finalizar` do AtendimentoController.

        return ResponseEntity.status(HttpStatus.CREATED).body(internacaoSalva);
    }

    /**
     * UC-05 (Fluxo 2): Registrar Alta Médica
     * Muda o status da internação para FINALIZADA e registra a data de saída.
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
     * Endpoint para adicionar evoluções (anotações diárias) a uma internação.
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
     * Endpoint para listar todas as internações ativas
     */
    @GetMapping("/ativas")
    public ResponseEntity<List<Internacao>> listarInternacoesAtivas() {
        List<Internacao> internacoes = internacaoRepository.findByStatus(StatusInternacao.ATIVA);
        return ResponseEntity.ok(internacoes);
    }

    /**
     * Endpoint para listar todas as internações ativas
     */
    @GetMapping
    public ResponseEntity<List<Internacao>> listarInternacoes() {
        List<Internacao> internacoes = internacaoRepository.findAll();
        return ResponseEntity.ok(internacoes);
    }

    /**
     * Endpoint para ver o histórico de internações de um paciente
     */
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Internacao>> getHistoricoInternacoesPaciente(@PathVariable Long pacienteId) {
        // **AÇÃO NECESSÁRIA:** Adicione este método na sua interface InternacaoRepository:
        // List<Internacao> findByPacienteIdPessoa(Long pacienteId);
        List<Internacao> historico = internacaoRepository.findByPacienteIdPessoa(pacienteId);
        return ResponseEntity.ok(historico);
    }
}