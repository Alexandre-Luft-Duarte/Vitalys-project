package org.unoesc.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * Representa um usuário do sistema que possui credenciais de acesso.
 * <p>
 * Estende {@link Pessoa} e serve como classe base para atores que interagem
 * com o software, como Médicos (Profissionais) e Recepcionistas.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "usuario")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Usuario extends Pessoa {

    /**
     * Endereço de e-mail utilizado como login no sistema.
     * Campo obrigatório.
     */
    @Column(nullable = false)
    private String email;

    /**
     * Senha de acesso criptografada.
     * Campo obrigatório.
     */
    @Column(nullable = false)
    private String senha;

    /**
     * Construtor para criar um novo usuário com dados pessoais e credenciais.
     *
     * @param idPessoa ID da pessoa.
     * @param nomeCompleto Nome completo.
     * @param cpf CPF.
     * @param dataNascimento Data de nascimento.
     * @param statusAtivo Se o usuário está ativo no sistema.
     * @param email Email de login.
     * @param senha Senha de acesso.
     */
    public Usuario(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo);
        this.email = email;
        this.senha = senha;
    }

    public Usuario() {}

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