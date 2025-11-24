package org.unoesc.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entidade que armazena informações de contato (ex: telefone) de uma pessoa.
 * Relacionamento Muitos-para-Um com {@link Pessoa}.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "contato")
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContato;

    /**
     * Número de telefone ou celular.
     */
    @Column(nullable = false)
    private String telefone;

    /**
     * Pessoa proprietária deste contato.
     */
    @JsonIgnore
    @JoinColumn(name = "id_pessoa")
    @ManyToOne
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

    public Pessoa getPessoa() {return pessoa;}

    public void setPessoa(Pessoa pessoa) {this.pessoa = pessoa;}
}