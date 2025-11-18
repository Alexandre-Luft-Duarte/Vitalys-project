package org.unoesc.backend.controller;

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
@RequestMapping("/api/atendimentos")
public class AtendimentoController {

    // Vamos precisar de todos estes repositórios
    @Autowired private AtendimentoRepository atendimentoRepository;
    @Autowired private PacienteRepository pacienteRepository;
    @Autowired private DepartamentoRepository departamentoRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private AnotacaoMedicaRepository anotacaoMedicaRepository;

    /**
     * [cite_start]UC-03: Registrar Entrada de Paciente [cite: 159, 162]
     * Cria um novo atendimento com status AGUARDANDO.
     */
    @PostMapping
    public ResponseEntity<Atendimento> registrarEntrada(@RequestBody AtendimentoRequestDTO request) {

        // 1. Buscar as entidades reais usando os IDs do DTO
        Paciente paciente = pacienteRepository.findById(request.pacienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado"));

        Departamento departamento = departamentoRepository.findById(request.departamentoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado"));

        Profissional profissional = null;
        if (request.profissionalId() != null) { // Profissional é opcional [cite: 163]
            profissional = profissionalRepository.findById(request.profissionalId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));
        }

        // 2. Criar o novo objeto Atendimento
        Atendimento novoAtendimento = new Atendimento();
        novoAtendimento.setPaciente(paciente);
        novoAtendimento.setDepartamento(departamento);
        novoAtendimento.setProfissional(profissional); // Pode ser null
        novoAtendimento.setDataHora(LocalDateTime.now());
        novoAtendimento.setStatus(StatusAtendimento.AGUARDANDO); // Status inicial [cite: 171]

        // 3. Salvar no banco
        Atendimento atendimentoSalvo = atendimentoRepository.save(novoAtendimento);
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoSalvo);
    }

    /**
     * [cite_start]UC-04: Visualizar Fila de Pacientes [cite: 108]
     * Lista atendimentos. Pode filtrar por status (ex: /api/atendimentos?status=AGUARDANDO)
     */
    @GetMapping
    public ResponseEntity<List<Atendimento>> listarAtendimentos(
            @RequestParam(required = false) StatusAtendimento status) {

        if (status != null) {
            // **AÇÃO NECESSÁRIA:** Adicione este método na sua interface AtendimentoRepository:
            // List<Atendimento> findByStatus(StatusAtendimento status);
            return ResponseEntity.ok(atendimentoRepository.findByStatus(status));
        }

        return ResponseEntity.ok(atendimentoRepository.findAll());
    }

    /**
     * [cite_start]UC-04: Iniciar Atendimento [cite: 109]
     * Muda o status de "AGUARDANDO" para "EM_ATENDIMENTO".
     */
    @PutMapping("/{id}/iniciar")
    public ResponseEntity<Atendimento> iniciarAtendimento(@PathVariable Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        atendimento.setStatus(StatusAtendimento.EM_ATENDIMENTO); // Muda o status [cite: 126]
        Atendimento atendimentoAtualizado = atendimentoRepository.save(atendimento);
        return ResponseEntity.ok(atendimentoAtualizado);
    }

    /**
     * [cite_start]UC-04: Finalizar Atendimento [cite: 114]
     * Muda o status para "FINALIZADO".
     */
    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Atendimento> finalizarAtendimento(@PathVariable Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        atendimento.setStatus(StatusAtendimento.FINALIZADO); // Muda o status [cite: 133]
        Atendimento atendimentoAtualizado = atendimentoRepository.save(atendimento);
        return ResponseEntity.ok(atendimentoAtualizado);
    }

    /**
     * [cite_start]UC-04: Registrar Anotações Médicas [cite: 112]
     * Adiciona uma nova anotação a um atendimento existente.
     */
    @PostMapping("/{id}/anotacoes")
    public ResponseEntity<AnotacaoMedica> registrarAnotacao(
            @PathVariable Long id,
            @RequestBody AnotacaoRequestDTO request) {

        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        Profissional profissional = profissionalRepository.findById(request.profissionalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));

        AnotacaoMedica novaAnotacao = new AnotacaoMedica();
        novaAnotacao.setTextoAnotacao(request.textoAnotacao());
        novaAnotacao.setDataHora(LocalDateTime.now());
        novaAnotacao.setAtendimento(atendimento); // Associa ao atendimento [cite: 119]

        AnotacaoMedica anotacaoSalva = anotacaoMedicaRepository.save(novaAnotacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(anotacaoSalva);
    }

    /**
     * [cite_start]UC-04: Visualizar Histórico do Paciente [cite: 111]
     * Retorna todos os atendimentos (passados e presentes) de um paciente.
     */
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Atendimento>> getHistoricoPaciente(@PathVariable Long pacienteId) {

        // **AÇÃO NECESSÁRIA:** Adicione este método na sua interface AtendimentoRepository:
        // List<Atendimento> findByPacienteIdPessoa(Long pacienteId);
        List<Atendimento> historico = atendimentoRepository.findByPacienteIdPessoa(pacienteId);

        return ResponseEntity.ok(historico);
    }
}