package org.unoesc.backend.model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "usuario")
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Usuario extends Pessoa{
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    public Usuario(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo);
        this.email = email;
        this.senha = senha;
    }

    public Usuario() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
