package org.unoesc.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.EnderecoDTO;
import org.unoesc.backend.dto.PacienteCadastroDTO;
import org.unoesc.backend.dto.PacienteListagemDTO;
import org.unoesc.backend.model.Contato;
import org.unoesc.backend.model.Endereco;
import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.repository.PacienteRepository;

/**
 * Controlador para o gerenciamento de pacientes.
 * Permite cadastrar, listar, atualizar e buscar detalhes dos pacientes.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    /**
     * Cadastra um novo paciente no sistema.
     * Realiza o mapeamento manual dos DTOs de endereço e contato para as entidades.
     *
     * @param dados DTO contendo os dados do paciente.
     * @return O paciente criado.
     * @throws ResponseStatusException Se houver conflito de CPF (409).
     */
    @PostMapping
    public ResponseEntity<Paciente> criarPaciente(@RequestBody PacienteCadastroDTO dados) {
        try {
            Paciente novoPaciente = new Paciente();

            novoPaciente.setNomeCompleto(dados.nomeCompleto());
            novoPaciente.setCpf(dados.cpf());
            novoPaciente.setDataNascimento(dados.dataNascimento());
            novoPaciente.setStatusAtivo(true);
            novoPaciente.setDescricaoMedica(dados.descricaoMedica());

            if (dados.telefone() != null && !dados.telefone().isBlank()) {
                Contato contato = new Contato();
                contato.setTelefone(dados.telefone());
                contato.setPessoa(novoPaciente);
                novoPaciente.addContato(contato);
            }

            if (dados.endereco() != null) {
                EnderecoDTO endDTO = dados.endereco();
                if (endDTO.logradouro() != null && !endDTO.logradouro().isBlank()) {
                    Endereco endereco = new Endereco();
                    endereco.setCep(endDTO.cep());
                    endereco.setLogradouro(endDTO.logradouro());
                    endereco.setNumero(endDTO.numero());
                    endereco.setBairro(endDTO.bairro());
                    endereco.setCidade((endDTO.cidade() != null && !endDTO.cidade().isBlank()) ? endDTO.cidade() : "São Miguel do Oeste");
                    endereco.setEstado((endDTO.estado() != null && !endDTO.estado().isBlank()) ? endDTO.estado() : "SC");
                    endereco.setPessoa(novoPaciente);
                    novoPaciente.addEndereco(endereco);
                }
            }

            Paciente pacienteSalvo = pacienteRepository.save(novoPaciente);
            return ResponseEntity.status(HttpStatus.CREATED).body(pacienteSalvo);

        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um paciente com este CPF.");
        }
    }

    /**
     * Lista todos os pacientes cadastrados, convertendo para um DTO resumido.
     *
     * @return Lista de pacientes formatada para exibição em tabelas.
     */
    @GetMapping
    public ResponseEntity<List<PacienteListagemDTO>> listarPacientes() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        List<PacienteListagemDTO> listaFormatada = pacientes.stream()
                .map(PacienteListagemDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaFormatada);
    }

    /**
     * Busca os detalhes completos de um paciente pelo ID.
     *
     * @param id Identificador do paciente.
     * @return A entidade Paciente completa ou 404 se não encontrado.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPaciente(@PathVariable Long id) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);
        if (pacienteOptional.isPresent()) {
            return ResponseEntity.ok(pacienteOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Atualiza os dados de um paciente existente.
     *
     * @param id Identificador do paciente.
     * @param pacienteDetails Dados a serem atualizados.
     * @return O paciente atualizado.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> atualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteDetails) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);

        if (pacienteOptional.isPresent()) {
            Paciente paciente = pacienteOptional.get();
            paciente.setNomeCompleto(pacienteDetails.getNomeCompleto());
            paciente.setCpf(pacienteDetails.getCpf());
            paciente.setDataNascimento(pacienteDetails.getDataNascimento());
            paciente.setStatusAtivo(pacienteDetails.getStatusAtivo());

            Paciente pacienteAtualizado = pacienteRepository.save(paciente);
            return ResponseEntity.ok(pacienteAtualizado);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Remove (exclui) um paciente do sistema.
     *
     * @param id Identificador do paciente.
     * @return 204 No Content se sucesso, ou 404 se não encontrado.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPaciente(@PathVariable Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}