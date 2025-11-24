package org.unoesc.backend.controller;

import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unoesc.backend.repository.ProfissionalRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profissional")
public class ProfissionalController {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @GetMapping("/{id}")
    ResponseEntity<Profissional> buscarPorId(@PathVariable Long id){
        Profissional profissional = profissionalRepository.findByIdPessoa(id);
        return ResponseEntity.ok(profissional);
    }
}
