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
 * Entidade que representa o endereço residencial ou comercial de uma pessoa.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "endereco")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEndereco;

    @Column(nullable = true)
    private String cidade;

    @Column(nullable = true)
    private String estado;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = true)
    private String numero;

    @Column(nullable = true)
    private String bairro;

    @Column(nullable = true)
    private String cep;

    /**
     * Pessoa residente neste endereço.
     */
    @JsonIgnore
    @JoinColumn(name = "id_pessoa")
    @ManyToOne
    private Pessoa pessoa;

    public Endereco(Long idEndereco, String cidade, String estado, String logradouro, String numero, String bairro, String cep) {
        this.idEndereco = idEndereco;
        this.cidade = cidade;
        this.estado = estado;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cep = cep;
    }

    public Endereco() {
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    
    // Getters e Setters padrões...
    public Long getIdEndereco() { return idEndereco; }
    public void setIdEndereco(Long idEndereco) { this.idEndereco = idEndereco; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getLogradouro() { return logradouro; }
    public void setLogradouro(String logradouro) { this.logradouro = logradouro; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
}