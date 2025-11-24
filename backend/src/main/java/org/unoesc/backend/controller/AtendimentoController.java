package org.unoesc.backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.AnotacaoRequestDTO;
import org.unoesc.backend.dto.AtendimentoClinicoDTO;
import org.unoesc.backend.dto.AtendimentoRequestDTO;
import org.unoesc.backend.dto.FilaAtendimentosDTO;
import org.unoesc.backend.dto.HistoricoAtendimentoDTO;
import org.unoesc.backend.dto.IniciarAtendimentoDTO;
import org.unoesc.backend.model.AnotacaoMedica;
import org.unoesc.backend.model.Atendimento;
import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.model.Internacao;
import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.Recepcionista;
import org.unoesc.backend.model.StatusAtendimento;
import org.unoesc.backend.repository.AnotacaoMedicaRepository;
import org.unoesc.backend.repository.AtendimentoRepository;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.unoesc.backend.repository.InternacaoRepository;
import org.unoesc.backend.repository.PacienteRepository;
import org.unoesc.backend.repository.ProfissionalRepository;
import org.unoesc.backend.repository.RecepcionistaRepository;

/**
 * Controlador principal para o fluxo de atendimentos clínicos.
 * <p>
 * Gerencia o ciclo de vida do atendimento: entrada na recepção, fila de espera,
 * início do atendimento médico, registro de anotações e finalização.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    @Autowired private AtendimentoRepository atendimentoRepository;
    @Autowired private PacienteRepository pacienteRepository;
    @Autowired private DepartamentoRepository departamentoRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private AnotacaoMedicaRepository anotacaoMedicaRepository;
    @Autowired private RecepcionistaRepository recepcionistaRepository;
    @Autowired private InternacaoRepository internacaoRepository;

    /**
     * Registra a entrada de um paciente no hospital (Triagem/Recepção).
     * Cria um novo atendimento com status inicial AGUARDANDO.
     *
     * @param request DTO contendo IDs do paciente, departamento, profissional e recepcionista.
     * @return O atendimento criado.
     * @throws ResponseStatusException Se alguma entidade relacionada não for encontrada.
     */
    @PostMapping
    public ResponseEntity<Atendimento> registrarEntrada(@RequestBody AtendimentoRequestDTO request) {

        Paciente paciente = pacienteRepository.findById(request.pacienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado"));

        Departamento departamento = departamentoRepository.findById(request.departamentoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado"));

        Profissional profissional = null;
        if (request.profissionalId() != null) {
            profissional = profissionalRepository.findById(request.profissionalId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));
        }

        Recepcionista recepcionista = null;
        if (request.recepcionistaId() != null) {
            recepcionista = recepcionistaRepository.findById(request.recepcionistaId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recepcionista não encontrado"));
        }

        Atendimento novoAtendimento = new Atendimento();
        novoAtendimento.setPaciente(paciente);
        novoAtendimento.setDepartamento(departamento);
        novoAtendimento.setProfissional(profissional);
        novoAtendimento.setRecepcionista(recepcionista);
        novoAtendimento.setMotivo(request.motivo());
        novoAtendimento.setDataHora(LocalDateTime.now());
        novoAtendimento.setStatus(StatusAtendimento.AGUARDANDO);

        Atendimento atendimentoSalvo = atendimentoRepository.save(novoAtendimento);
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoSalvo);
    }

    /**
     * Lista todos os atendimentos cadastrados para exibição no Dashboard.
     * Converte as entidades para um DTO simplificado de fila.
     *
     * @return Lista de atendimentos formatada para a fila.
     */
    @GetMapping
    public ResponseEntity<List<FilaAtendimentosDTO>> listarAtendimentos() {
        List<Atendimento> listaCompleta = atendimentoRepository.findAll();

        List<FilaAtendimentosDTO> listaDTO = listaCompleta.stream()
            .map(at -> new FilaAtendimentosDTO(
                at.getIdAtendimento(),
                at.getPaciente().getNomeCompleto(),
                at.getDataHora(),
                at.getMotivo(),
                at.getStatus().toString(),
                (at.getProfissional() != null) ? at.getProfissional().getNomeCompleto() : null
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(listaDTO);
    }

    /**
     * Lista os atendimentos filtrados por um departamento específico.
     *
     * @param idDepartamento ID do departamento.
     * @return Lista de atendimentos daquele departamento.
     */
    @GetMapping("/{idDepartamento}/departamento")
    public ResponseEntity<List<FilaAtendimentosDTO>> listarAtendimentosByDepartamento(@PathVariable Long idDepartamento) {
        List<Atendimento> listaCompleta = atendimentoRepository.findByDepartamentoIdDepartamento(idDepartamento);

        List<FilaAtendimentosDTO> listaDTO = listaCompleta.stream()
                .map(at -> new FilaAtendimentosDTO(
                        at.getIdAtendimento(),
                        at.getPaciente().getNomeCompleto(),
                        at.getDataHora(),
                        at.getMotivo(),
                        at.getStatus().toString(),
                        (at.getProfissional() != null) ? at.getProfissional().getNomeCompleto() : null
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(listaDTO);
    }

    /**
     * Inicia o atendimento clínico de um paciente.
     * Altera o status para EM_ATENDIMENTO e vincula o profissional responsável.
     *
     * @param id ID do atendimento.
     * @param request DTO contendo o ID do profissional que está chamando.
     * @return O atendimento atualizado.
     */
    @PutMapping("/{id}/iniciar")
    public ResponseEntity<Atendimento> iniciarAtendimento(@PathVariable Long id, @RequestBody IniciarAtendimentoDTO request) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        atendimento.setStatus(StatusAtendimento.EM_ATENDIMENTO);
        Profissional pro = profissionalRepository.findById(request.idProfissional())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profissional não encontrado"));

        atendimento.setProfissional(pro);
        Atendimento atendimentoAtualizado = atendimentoRepository.save(atendimento);
        return ResponseEntity.ok(atendimentoAtualizado);
    }

    /**
     * Finaliza um atendimento em curso.
     * Altera o status para FINALIZADO.
     *
     * @param id ID do atendimento.
     * @return O atendimento atualizado.
     */
    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Atendimento> finalizarAtendimento(@PathVariable Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Atendimento não encontrado"));

        atendimento.setStatus(StatusAtendimento.FINALIZADO);
        Atendimento atendimentoAtualizado = atendimentoRepository.save(atendimento);
        return ResponseEntity.ok(atendimentoAtualizado);
    }

    /**
     * Registra uma nova anotação médica (evolução, anamnese) no atendimento.
     *
     * @param id ID do atendimento.
     * @param request DTO contendo o texto da anotação e o ID do profissional.
     * @return A anotação criada.
     */
    @PostMapping("/{id}/anotacoes")
    public ResponseEntity<AnotacaoMedica> registrarAnotacao(
            @PathVariable Long id,
            @RequestBody AnotacaoRequestDTO request) {

        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Atendimento não encontrado"));

        Profissional profissional = profissionalRepository.findById(request.profissionalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Profissional não encontrado"));

        AnotacaoMedica novaAnotacao = new AnotacaoMedica();
        novaAnotacao.setTextoAnotacao(request.textoAnotacao());
        novaAnotacao.setDataHora(LocalDateTime.now());
        novaAnotacao.setAtendimento(atendimento);

        AnotacaoMedica anotacaoSalva = anotacaoMedicaRepository.save(novaAnotacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(anotacaoSalva);
    }

    /**
     * Recupera o histórico completo do paciente (Atendimentos e Internações).
     *
     * @param pacienteId ID do paciente.
     * @return Lista combinada de histórico clínico.
     */
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<HistoricoAtendimentoDTO>> getHistoricoPaciente(@PathVariable Long pacienteId) {

        List<Atendimento> atendimentos = atendimentoRepository.findByPacienteIdPessoaAndStatus(
                pacienteId,
                StatusAtendimento.FINALIZADO
        );

        List<Internacao> internacoes = internacaoRepository.findByPacienteIdPessoa(pacienteId);

        List<HistoricoAtendimentoDTO> historicoCompleto = atendimentos.stream()
                .map(at -> {
                    Internacao internacaoVinculada = internacoes.stream()
                            .filter(it -> it.getAtendimento().getIdAtendimento().equals(at.getIdAtendimento()))
                            .findFirst()
                            .orElse(null);

                    return new HistoricoAtendimentoDTO(at, internacaoVinculada);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(historicoCompleto);
    }

    /**
     * Busca os dados detalhados de um atendimento para a tela de Prontuário.
     * Inclui dados do paciente, cálculo de idade e vínculos.
     *
     * @param id ID do atendimento.
     * @return DTO completo com dados do atendimento e paciente.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AtendimentoClinicoDTO> buscarAtendimento(@PathVariable Long id) {
        Optional<Atendimento> atendimentoOpt = atendimentoRepository.findById(id);

        if (atendimentoOpt.isPresent()) {
            Atendimento at = atendimentoOpt.get();
            Paciente p = at.getPaciente();

            int idade = 0;
            if (p.getDataNascimento() != null) {
                idade = Period.between(p.getDataNascimento(), LocalDate.now()).getYears();
            }

            AtendimentoClinicoDTO dto = new AtendimentoClinicoDTO(
                    at.getIdAtendimento(),
                    at.getStatus().toString(),
                    p.getIdPessoa(),
                    p.getNomeCompleto(),
                    p.getCpf(),
                    idade,
                    p.getDataNascimento(),
                    at.getProfissional().getIdPessoa(),
                    at.getDepartamento().getIdDepartamento()
            );

            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
}