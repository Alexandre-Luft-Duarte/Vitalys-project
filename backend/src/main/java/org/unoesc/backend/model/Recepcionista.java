package org.unoesc.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * Representa um usuário com perfil de Recepcionista no sistema.
 * <p>
 * Responsável por realizar o cadastro de pacientes, agendamentos e
 * iniciar o fluxo de atendimento na recepção.
 * Estende {@link Usuario} pois necessita de credenciais de acesso.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "recepcionista")
@PrimaryKeyJoinColumn(name = "id_pessoa")
public class Recepcionista extends Usuario {

    /**
     * Construtor completo para cadastro de recepcionista.
     *
     * @param idPessoa ID da pessoa.
     * @param nomeCompleto Nome completo.
     * @param cpf CPF.
     * @param dataNascimento Data de nascimento.
     * @param statusAtivo Status do cadastro.
     * @param email Email para login.
     * @param senha Senha de acesso.
     */
    public Recepcionista(Long idPessoa, String nomeCompleto, String cpf, LocalDate dataNascimento, Boolean statusAtivo, String email, String senha) {
        super(idPessoa, nomeCompleto, cpf, dataNascimento, statusAtivo, email, senha);
    }

    public Recepcionista() {
    }
}