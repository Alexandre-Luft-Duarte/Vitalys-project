package org.unoesc.backend.controller;

import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    // Endpoint para CRIAR (POST)
    @PostMapping
    public ResponseEntity<Departamento> criarDepartamento(@RequestBody Departamento departamento) {
        Departamento novoDepartamento = departamentoRepository.save(departamento);
        return ResponseEntity.ok(novoDepartamento);
    }

    // Endpoint para LER TODOS (GET)
    @GetMapping
    public ResponseEntity<List<Departamento>> listarDepartamentos() {
        List<Departamento> departamentos = departamentoRepository.findAll();
        return ResponseEntity.ok(departamentos);
    }

    // Endpoint para LER UM por ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Departamento> buscarDepartamento(@PathVariable Long id) {
        Optional<Departamento> departamentoOptional = departamentoRepository.findById(id);

        if (departamentoOptional.isPresent()) {
            return ResponseEntity.ok(departamentoOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para ATUALIZAR (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Departamento> atualizarDepartamento(@PathVariable Long id, @RequestBody Departamento departamentoDetails) {
        Optional<Departamento> departamentoOptional = departamentoRepository.findById(id);

        if (departamentoOptional.isPresent()) {
            Departamento departamento = departamentoOptional.get();
            departamento.setNome(departamentoDetails.getNome()); // Atualiza o nome

            Departamento departamentoAtualizado = departamentoRepository.save(departamento);
            return ResponseEntity.ok(departamentoAtualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para DELETAR (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDepartamento(@PathVariable Long id) {
        if (departamentoRepository.existsById(id)) {
            departamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
