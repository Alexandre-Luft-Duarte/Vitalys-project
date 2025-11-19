package org.unoesc.backend.controller;

import org.unoesc.backend.dto.EnderecoDTO; // Import do novo DTO
import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.unoesc.backend.dto.PacienteCadastroDTO;
import org.unoesc.backend.model.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.PacienteListagemDTO;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    // Injeta o REPOSITORY diretamente
    @Autowired
    private PacienteRepository pacienteRepository;

    // Endpoint para CRIAR (POST)
    @PostMapping
    public ResponseEntity<Paciente> criarPaciente(@RequestBody PacienteCadastroDTO dados) {
        try {
            Paciente novoPaciente = new Paciente();

            // 1. Dados Pessoais (Classe Mãe Pessoa)
            novoPaciente.setNomeCompleto(dados.nomeCompleto());
            novoPaciente.setCpf(dados.cpf());
            novoPaciente.setDataNascimento(dados.dataNascimento());
            novoPaciente.setStatusAtivo(true);

            // 2. Dados Específicos de Paciente
            novoPaciente.setDescricaoMedica(dados.descricaoMedica());

            // 3. Contato (Telefone)
            if (dados.telefone() != null && !dados.telefone().isBlank()) {
                Contato contato = new Contato();
                contato.setTelefone(dados.telefone());
                contato.setPessoa(novoPaciente);
                novoPaciente.addContato(contato);
            }

            // 4. Endereço (Agora mapeado direto do EnderecoDTO)
            if (dados.endereco() != null) {
                EnderecoDTO endDTO = dados.endereco();

                // Validamos se pelo menos a rua (logradouro) veio preenchida
                // pois ela é obrigatória no banco (nullable = false)
                if (endDTO.logradouro() != null && !endDTO.logradouro().isBlank()) {

                    Endereco endereco = new Endereco();

                    endereco.setCep(endDTO.cep());
                    endereco.setLogradouro(endDTO.logradouro());
                    endereco.setNumero(endDTO.numero());
                    endereco.setBairro(endDTO.bairro());

                    // Cidade e Estado são obrigatórios no banco.
                    // Se o DTO trouxer, usamos. Se não, usamos um padrão (fallback).
                    String cidade = (endDTO.cidade() != null && !endDTO.cidade().isBlank())
                            ? endDTO.cidade() : "São Miguel do Oeste";

                    String estado = (endDTO.estado() != null && !endDTO.estado().isBlank())
                            ? endDTO.estado() : "SC";

                    endereco.setCidade(cidade);
                    endereco.setEstado(estado);

                    // Associações
                    endereco.setPessoa(novoPaciente);
                    novoPaciente.addEndereco(endereco);
                }
            }

            // 5. Salvar (Cascade salva Contato e Endereco automaticamente)
            Paciente pacienteSalvo = pacienteRepository.save(novoPaciente);
            return ResponseEntity.status(HttpStatus.CREATED).body(pacienteSalvo);

        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um paciente com este CPF.");
        }
    }

    @GetMapping
    public ResponseEntity<List<PacienteListagemDTO>> listarPacientes() {
        // 1. Busca as entidades no banco
        List<Paciente> pacientes = pacienteRepository.findAll();

        // 2. Converte a lista de Entidades para a lista de DTOs
        List<PacienteListagemDTO> listaFormatada = pacientes.stream()
                .map(PacienteListagemDTO::new) // Chama aquele construtor auxiliar que criamos
                .collect(Collectors.toList());

        return ResponseEntity.ok(listaFormatada);
    }

    // Endpoint para LER UM por ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPaciente(@PathVariable Long id) {
        // O findById retorna um Optional, precisamos tratá-lo
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);

        if (pacienteOptional.isPresent()) {
            return ResponseEntity.ok(pacienteOptional.get());
        }
        return ResponseEntity.notFound().build(); // Retorna 404 se não achar
    }

    // Endpoint para ATUALIZAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> atualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteDetails) {
        Optional<Paciente> pacienteOptional = pacienteRepository.findById(id);

        if (pacienteOptional.isPresent()) {
            Paciente paciente = pacienteOptional.get(); // Pega o paciente do banco

            // Atualiza os dados do paciente existente com os novos
            paciente.setNomeCompleto(pacienteDetails.getNomeCompleto());
            paciente.setCpf(pacienteDetails.getCpf());
            paciente.setDataNascimento(pacienteDetails.getDataNascimento());
            paciente.setStatusAtivo(pacienteDetails.getStatusAtivo());
            // (etc. para outros campos como endereço, contato)

            Paciente pacienteAtualizado = pacienteRepository.save(paciente);
            return ResponseEntity.ok(pacienteAtualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // (Opcional) Endpoint para DELETAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPaciente(@PathVariable Long id) {
        if (pacienteRepository.existsById(id)) { // Verifica se existe
            pacienteRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Retorna 204
        }
        return ResponseEntity.notFound().build();
    }
}