package org.unoesc.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.repository.ProfissionalRepository;

/**
 * Controlador para gerenciamento e consulta de Profissionais de Saúde.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/profissional")
public class ProfissionalController {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    /**
     * Busca um profissional pelo seu ID.
     * Utiliza o método personalizado do repositório.
     *
     * @param id ID do profissional (Pessoa).
     * @return O profissional encontrado.
     */
    @GetMapping("/{id}")
    ResponseEntity<Profissional> buscarPorId(@PathVariable Long id){
        Profissional profissional = profissionalRepository.findByIdPessoa(id);
        return ResponseEntity.ok(profissional);
    }
}