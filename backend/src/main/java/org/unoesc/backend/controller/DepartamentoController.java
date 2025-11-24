package org.unoesc.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.repository.DepartamentoRepository;

/**
 * Controlador para CRUD de departamentos hospitalares.
 * Gerencia os setores do hospital (ex: Emergência, UTI, Maternidade) utilizados
 * para alocar profissionais e pacientes.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    /**
     * Cria um novo departamento no sistema.
     *
     * @param departamento Objeto contendo o nome do departamento.
     * @return O departamento criado.
     */
    @PostMapping
    public ResponseEntity<Departamento> criarDepartamento(@RequestBody Departamento departamento) {
        Departamento novoDepartamento = departamentoRepository.save(departamento);
        return ResponseEntity.ok(novoDepartamento);
    }

    /**
     * Lista todos os departamentos cadastrados.
     *
     * @return Lista de departamentos.
     */
    @GetMapping
    public ResponseEntity<List<Departamento>> listarDepartamentos() {
        List<Departamento> departamentos = departamentoRepository.findAll();
        return ResponseEntity.ok(departamentos);
    }

    /**
     * Busca um departamento pelo seu ID.
     *
     * @param id Identificador do departamento.
     * @return O departamento encontrado ou 404 (Not Found).
     */
    @GetMapping("/{id}")
    public ResponseEntity<Departamento> buscarDepartamento(@PathVariable Long id) {
        Optional<Departamento> departamentoOptional = departamentoRepository.findById(id);

        if (departamentoOptional.isPresent()) {
            return ResponseEntity.ok(departamentoOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Atualiza o nome de um departamento existente.
     *
     * @param id Identificador do departamento.
     * @param departamentoDetails Objeto com os novos dados.
     * @return O departamento atualizado.
     */
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

    /**
     * Remove um departamento do sistema.
     *
     * @param id Identificador do departamento.
     * @return 204 (No Content) se removido com sucesso, ou 404 se não encontrado.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDepartamento(@PathVariable Long id) {
        if (departamentoRepository.existsById(id)) {
            departamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}