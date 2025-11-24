package org.unoesc.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * Representa um profissional de saúde (Médico, Enfermeiro, etc.) no sistema.
 * <p>
 * Estende {@link Usuario}, possuindo login e senha, e está vinculado a um
 * {@link Departamento} específico do hospital.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "profissional")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Profissional extends Usuario {

    /**
     * Departamento ao qual o profissional está alocado (ex: Cardiologia, Emergência).
     */
    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    /**
     * Construtor completo para cadastro de profissional.
     *
     * @param idPessoa ID da pessoa.
     * @param nomeCompleto Nome completo.
     * @param cpf CPF.
     * @param dataNascimento Data de nascimento.
     * @param statusAtivo Status do cadastro.
     * @param email Email de login.
     * @param senha Senha de acesso.
     * @param departamento Departamento de atuação.
     */
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