package org.unoesc.backend.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Entidade base para todas as pessoas cadastradas no sistema.
 * <p>
 * Utiliza a estratégia de herança {@code InheritanceType.JOINED}, o que significa
 * que esta tabela conterá os dados comuns, enquanto as tabelas filhas (Usuario, Paciente)
 * conterão os dados específicos.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "pessoa")
@Inheritance(strategy = InheritanceType.JOINED)
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPessoa;

    /**
     * Nome completo da pessoa.
     */
    @Column(nullable = false)
    private String nomeCompleto;

    /**
     * CPF da pessoa. Deve ser único no sistema.
     */
    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    /**
     * Indica se o registro está ativo no sistema (Soft Delete).
     */
    @Column(nullable = false)
    private Boolean statusAtivo = false;

    /**
     * Lista de endereços associados à pessoa.
     * O mapeamento é gerenciado com CascadeType.ALL.
     */
    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Endereco> enderecos = new ArrayList<>();

    /**
     * Lista de contatos (telefones, emails adicionais) associados à pessoa.
     */
    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos = new ArrayList<>();

    public Pessoa(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo) {
        this.idPessoa = idPessoa;
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.statusAtivo = statusAtivo;
    }

    public Pessoa() {}

    public Long getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(Long idPessoa) {
        this.idPessoa = idPessoa;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Boolean getStatusAtivo() {
        return statusAtivo;
    }

    public void setStatusAtivo(Boolean statusAtivo) {
        this.statusAtivo = statusAtivo;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public List<Contato> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
    }

    /**
     * Adiciona um endereço à lista e mantém a consistência bidirecional.
     * @param endereco Endereço a ser adicionado.
     */
    public void addEndereco(Endereco endereco) {
        this.enderecos.add(endereco);
    }

    /**
     * Adiciona um contato à lista e mantém a consistência bidirecional.
     * @param contato Contato a ser adicionado.
     */
    public void addContato(Contato contato) {
        this.contatos.add(contato);
    }
}