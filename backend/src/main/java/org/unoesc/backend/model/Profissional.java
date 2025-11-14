package org.unoesc.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "profissional")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Profissional extends Usuario{
    @ManyToOne
    @JoinColumn(name = "id_especialidade", nullable = false)
    private Especialidade especialidade;

    public Profissional(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha, Especialidade especialidade) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo, email, senha);
        this.especialidade = especialidade;
    }

    public Profissional() {}

    public Especialidade getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(Especialidade especialidade) {
        this.especialidade = especialidade;
    }
}
