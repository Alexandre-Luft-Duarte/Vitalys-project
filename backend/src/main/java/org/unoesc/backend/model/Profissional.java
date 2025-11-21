package org.unoesc.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "profissional")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Profissional extends Usuario{
    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    public Profissional(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha, Departamento departamento) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo, email, senha);
        this.departamento = departamento;
    }

    public Profissional() {}

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
}
