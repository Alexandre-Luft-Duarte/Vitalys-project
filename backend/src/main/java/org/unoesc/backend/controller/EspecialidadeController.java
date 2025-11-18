package org.unoesc.backend.controller;

import org.unoesc.backend.model.Especialidade;
import org.unoesc.backend.repository.EspecialidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/especialidades")
public class EspecialidadeController {

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    // Endpoint para CRIAR (POST)
    @PostMapping
    public ResponseEntity<Especialidade> criarEspecialidade(@RequestBody Especialidade especialidade) {
        Especialidade novaEspecialidade = especialidadeRepository.save(especialidade);
        return ResponseEntity.ok(novaEspecialidade);
    }

    // Endpoint para LER TODOS (GET)
    @GetMapping
    public ResponseEntity<List<Especialidade>> listarEspecialidades() {
        List<Especialidade> especialidades = especialidadeRepository.findAll();
        return ResponseEntity.ok(especialidades);
    }

    // Endpoint para LER UM por ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> buscarEspecialidade(@PathVariable Long id) {
        Optional<Especialidade> especialidadeOptional = especialidadeRepository.findById(id);

        if (especialidadeOptional.isPresent()) {
            return ResponseEntity.ok(especialidadeOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para ATUALIZAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Especialidade> atualizarEspecialidade(@PathVariable Long id, @RequestBody Especialidade especialidadeDetails) {
        Optional<Especialidade> especialidadeOptional = especialidadeRepository.findById(id);

        if (especialidadeOptional.isPresent()) {
            Especialidade especialidade = especialidadeOptional.get();
            especialidade.setNome(especialidadeDetails.getNome()); // Atualiza o nome

            Especialidade especialidadeAtualizada = especialidadeRepository.save(especialidade);
            return ResponseEntity.ok(especialidadeAtualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para DELETAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEspecialidade(@PathVariable Long id) {
        if (especialidadeRepository.existsById(id)) {
            especialidadeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}