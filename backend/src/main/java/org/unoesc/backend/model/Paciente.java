package org.unoesc.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * Representa um paciente no sistema hospitalar.
 * <p>
 * Estende a classe {@link Pessoa}, herdando seus dados.
 * Esta entidade armazena informações clínicas específicas do paciente.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "paciente")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Paciente extends Pessoa {

    /**
     * Descrição breve ou observações médicas gerais sobre o paciente.
     * Pode conter histórico resumido ou alertas.
     */
    @Column(nullable = true)
    private String descricaoMedica;

    /**
     * Construtor completo para criação de um novo paciente.
     *
     * @param idPessoa ID da pessoa (geralmente nulo na criação).
     * @param nomeCompleto Nome completo do paciente.
     * @param cpf CPF único.
     * @param dataNascimento Data de nascimento.
     * @param statusAtivo Indica se o cadastro está ativo.
     * @param descricaoMedica Observações médicas iniciais.
     */
    public Paciente(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String descricaoMedica) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo);
        this.descricaoMedica = descricaoMedica;
    }

    public Paciente() {
    }

    public String getDescricaoMedica() {
        return descricaoMedica;
    }

    public void setDescricaoMedica(String descricaoMedica) {
        this.descricaoMedica = descricaoMedica;
    }
}
