package org.unoesc.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "profissional")
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Profissional extends Usuario{
    @Column(nullable = false)
    private String especialidade;

    public Profissional(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha, String especialidade) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo, email, senha);
        this.especialidade = especialidade;
    }

    public Profissional() {
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
