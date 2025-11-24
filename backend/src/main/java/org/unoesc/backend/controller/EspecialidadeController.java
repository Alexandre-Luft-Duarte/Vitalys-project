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
import org.unoesc.backend.model.Especialidade;
import org.unoesc.backend.repository.EspecialidadeRepository;

/**
 * Controlador para CRUD de especialidades médicas.
 * Gerencia o catálogo de especialidades (ex: Cardiologia, Pediatria) disponíveis no hospital.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/especialidades")
public class EspecialidadeController {

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    /**
     * Cadastra uma nova especialidade médica.
     *
     * @param especialidade Objeto contendo o nome da especialidade.
     * @return A especialidade criada.
     */
    @PostMapping
    public ResponseEntity<Especialidade> criarEspecialidade(@RequestBody Especialidade especialidade) {
        Especialidade novaEspecialidade = especialidadeRepository.save(especialidade);
        return ResponseEntity.ok(novaEspecialidade);
    }

    /**
     * Lista todas as especialidades cadastradas.
     *
     * @return Lista de especialidades.
     */
    @GetMapping
    public ResponseEntity<List<Especialidade>> listarEspecialidades() {
        List<Especialidade> especialidades = especialidadeRepository.findAll();
        return ResponseEntity.ok(especialidades);
    }

    /**
     * Busca uma especialidade pelo seu ID.
     *
     * @param id Identificador da especialidade.
     * @return A especialidade encontrada ou 404 (Not Found).
     */
    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> buscarEspecialidade(@PathVariable Long id) {
        Optional<Especialidade> especialidadeOptional = especialidadeRepository.findById(id);

        if (especialidadeOptional.isPresent()) {
            return ResponseEntity.ok(especialidadeOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Atualiza o nome de uma especialidade existente.
     *
     * @param id Identificador da especialidade.
     * @param especialidadeDetails Objeto com os novos dados.
     * @return A especialidade atualizada.
     */
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

    /**
     * Remove uma especialidade do sistema.
     *
     * @param id Identificador da especialidade.
     * @return 204 (No Content) se removido com sucesso, ou 404 se não encontrado.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEspecialidade(@PathVariable Long id) {
        if (especialidadeRepository.existsById(id)) {
            especialidadeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}