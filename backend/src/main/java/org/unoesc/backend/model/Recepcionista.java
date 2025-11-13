package org.unoesc.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "recepcionista")
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Recepcionista extends Usuario{

    public Recepcionista(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo, email, senha);
    }

    public Recepcionista() {
    }
}
