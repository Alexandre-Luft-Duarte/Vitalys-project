package org.unoesc.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "paciente")
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Paciente extends Pessoa{
    @Column(nullable = true)
    private String descricaoMedica;

    public Paciente(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String descricaoMedica) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo);
        this.descricaoMedica = descricaoMedica;
    }

    public Paciente() {
    }

    public String getDescricaoMedica() {
        return descricaoMedica;
    }

    public void setDescricaoMedica(String descricaoMedica) {
        this.descricaoMedica = descricaoMedica;
    }
}
