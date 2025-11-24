package org.unoesc.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidade que representa uma unidade organizacional ou setor do hospital
 * (ex: Cardiologia, Recepção, UTI).
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "departamento")
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDepartamento;

    /**
     * Nome descritivo do departamento.
     */
    @Column(nullable = false)
    private String nome;

    public Departamento(Long idDepartamento, String nome) {
        this.idDepartamento = idDepartamento;
        this.nome = nome;
    }

    public Departamento() {}

    public Long getIdDepartamento() {
        return idDepartamento;
    }

    public void setIdDepartamento(Long idDepartamento) {
        this.idDepartamento = idDepartamento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}