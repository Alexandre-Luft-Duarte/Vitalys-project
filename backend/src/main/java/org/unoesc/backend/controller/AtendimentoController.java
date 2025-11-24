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
import org.springframework.web.bind.annotation.PutMapping; // Importa todas as suas entidades
import org.springframework.web.bind.annotation.RequestBody; // Importa todos os seus repositórios
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.AnotacaoRequestDTO;
import org.unoesc.backend.dto.AtendimentoClinicoDTO;
import org.unoesc.backend.dto.AtendimentoRequestDTO;
import org.unoesc.backend.dto.FilaAtendimentosDTO;
import org.unoesc.backend.model.AnotacaoMedica;
import org.unoesc.backend.model.Atendimento;
import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.StatusAtendimento;
import org.unoesc.backend.repository.AnotacaoMedicaRepository;
import org.unoesc.backend.repository.AtendimentoRepository;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.unoesc.backend.repository.PacienteRepository;
import org.unoesc.backend.repository.ProfissionalRepository;

@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    // Vamos precisar de todos estes repositórios
    @Autowired private AtendimentoRepository atendimentoRepository;
    @Autowired private PacienteRepository pacienteRepository;
    @Autowired private DepartamentoRepository departamentoRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private AnotacaoMedicaRepository anotacaoMedicaRepository;
    @Autowired private RecepcionistaRepository recepcionistaRepository;

    /**
     *  Registrar Entrada de Paciente
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

        Recepcionista recepcionista = null;
        if (request.recepcionistaId() != null) { // Profissional é opcional [cite: 163]
            recepcionista = recepcionistaRepository.findById(request.recepcionistaId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recepcionista não encontrado"));
        }

        // 2. Criar o novo objeto Atendimento
        Atendimento novoAtendimento = new Atendimento();
        novoAtendimento.setPaciente(paciente);
        novoAtendimento.setDepartamento(departamento);
        novoAtendimento.setProfissional(profissional);
        novoAtendimento.setRecepcionista(recepcionista);// Pode ser null
        novoAtendimento.setMotivo(request.motivo());  // Pode ser null
        novoAtendimento.setDataHora(LocalDateTime.now());
        novoAtendimento.setStatus(StatusAtendimento.AGUARDANDO); // Status inicial [cite: 171]

        // 3. Salvar no banco
        Atendimento atendimentoSalvo = atendimentoRepository.save(novoAtendimento);
        return ResponseEntity.status(HttpStatus.CREATED).body(atendimentoSalvo);
    }

    /**
     *  Visualizar Fila de Pacientes
     * Lista atendimentos. Pode filtrar por status (ex: /api/atendimentos?status=AGUARDANDO)
     */
    @GetMapping
    public ResponseEntity<List<FilaAtendimentosDTO>> listarAtendimentos() {
        List<Atendimento> listaCompleta = atendimentoRepository.findAll();

        List<FilaAtendimentosDTO> listaDTO = listaCompleta.stream()
            .map(at -> new FilaAtendimentosDTO(
                at.getIdAtendimento(),
                at.getPaciente().getNomeCompleto(),
                at.getDataHora(),
                at.getMotivo(),           // Agora isso vai funcionar pois alteramos a Entidade no Passo 1
                at.getStatus().toString()
            ))
            .collect(Collectors.toList());


        return ResponseEntity.ok(listaDTO);
    }

    // /**
    //  *  Iniciar Atendimento 
    //  * Muda o status de "AGUARDANDO" para "EM_ATENDIMENTO".
    //  */
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
     * Finalizar Atendimento 
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
     * Registrar Anotações Médicas
     * Adiciona uma nova anotação a um atendimento existente.
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

    /**
     * Busca os dados completos para a tela de atendimento.
     * GET /api/atendimentos/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AtendimentoClinicoDTO> buscarAtendimento(@PathVariable Long id) {
        Optional<Atendimento> atendimentoOpt = atendimentoRepository.findById(id);

        if (atendimentoOpt.isPresent()) {
            Atendimento at = atendimentoOpt.get();
            Paciente p = at.getPaciente();

            // Calcular a idade (evita erro se dataNascimento for null)
            int idade = 0;
            if (p.getDataNascimento() != null) {
                idade = Period.between(p.getDataNascimento(), LocalDate.now()).getYears();
            }

            // AQUI ESTÁ A CORREÇÃO: A ordem deve ser IDÊNTICA ao record AtendimentoClinicoDTO
            AtendimentoClinicoDTO dto = new AtendimentoClinicoDTO(
                    at.getIdAtendimento(),       // 1. Long idAtendimento
                    at.getStatus().toString(),   // 2. String status
                    p.getIdPessoa(),             // 3. Long idPaciente (Herança de Pessoa)
                    p.getNomeCompleto(),         // 4. String nomePaciente
                    p.getCpf(),                  // 5. String cpf
                    idade,                       // 6. Integer idade
                    p.getDataNascimento(),
                    at.getProfissional().getIdPessoa()// 7. LocalDate dataNascimento
            );

            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
}