package org.unoesc.backend.model;

import jakarta.persistence.*;
import org.unoesc.backend.model.*;

@Entity
@Table(name = "contato")
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContato;

    @Column(nullable = false)
    private String telefone;

    @JoinColumn(name = "idPessoa")
    private Pessoa pessoa;

    public Contato(Long idContato, String telefone) {
        this.idContato = idContato;
        this.telefone = telefone;
    }

    public Contato() {
    }

    public Long getIdContato() {
        return idContato;
    }

    public void setIdContato(Long idContato) {
        this.idContato = idContato;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
