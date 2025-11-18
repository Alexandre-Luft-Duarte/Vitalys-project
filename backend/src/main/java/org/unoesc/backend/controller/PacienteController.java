package org.unoesc.backend.controller;

import org.unoesc.backend.model.Paciente;
import org.unoesc.backend.repository.PacienteRepository; // <-- Importa o Repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional; // <-- Importar Optional

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    // Injeta o REPOSITORY diretamente
    @Autowired
    private PacienteRepository pacienteRepository;

    // Endpoint para CRIAR (POST)
    @PostMapping
    public ResponseEntity<Paciente> criarPaciente(@RequestBody Paciente paciente) {
        // A lógica de salvar fica aqui
        Paciente novoPaciente = pacienteRepository.save(paciente);
        return ResponseEntity.ok(novoPaciente);
    }

    // Endpoint para LER TODOS (GET)
    @GetMapping
    public ResponseEntity<List<Paciente>> listarPacientes() {
        // A lógica de buscar fica aqui
        List<Paciente> pacientes = pacienteRepository.findAll();
        return ResponseEntity.ok(pacientes);
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