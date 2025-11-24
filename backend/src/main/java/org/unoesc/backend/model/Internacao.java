package org.unoesc.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * Entidade que representa o processo de internação de um paciente.
 * <p>
 * Vincula o paciente a um leito/departamento sob os cuidados de um profissional,
 * originado a partir de um atendimento inicial.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "internacao")
public class Internacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInternacao;

    /**
     * Data e hora da admissão do paciente na internação.
     */
    @Column(nullable = false)
    private LocalDateTime dataEntrada;

    /**
     * Data e hora da alta ou saída da internação.
     * Pode ser nulo enquanto a internação estiver ativa.
     */
    @Column(nullable = true)
    private LocalDateTime dataSaida;

    /**
     * Status atual da internação (ex: ATIVA, FINALIZADA).
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusInternacao status;

    /**
     * Paciente internado.
     */
    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    /**
     * Profissional responsável pela internação.
     */
    @ManyToOne
    @JoinColumn(name = "id_profissional", nullable = false)
    private Profissional profissional;

    /**
     * Departamento ou ala onde o paciente está alocado.
     */
    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    /**
     * Atendimento de origem que gerou a solicitação de internação.
     * Relacionamento Um-para-Um.
     */
    @OneToOne
    @JoinColumn(name = "id_atendimento", nullable = false, unique = true)
    private Atendimento atendimento;

    /**
     * Lista de evoluções clínicas registradas durante o período de internação.
     */
    @OneToMany(mappedBy = "internacao", cascade = CascadeType.ALL)
    private List<EvolucaoInternacao> evolucoesInternacao = new ArrayList<>();

    public Internacao(Long idInternacao, LocalDateTime dataEntrada, LocalDateTime dataSaida, StatusInternacao status, Paciente paciente, Profissional profissional, List<EvolucaoInternacao> evolucoesInternacao, Departamento departamento, Atendimento atendimento) {
        this.idInternacao = idInternacao;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.status = status;
        this.paciente = paciente;
        this.profissional = profissional;
        this.evolucoesInternacao = evolucoesInternacao;
        this.departamento = departamento;
        this.atendimento = atendimento;
    }

    public Internacao() {}

    public Long getIdInternacao() {
        return idInternacao;
    }

    public void setIdInternacao(Long idInternacao) {
        this.idInternacao = idInternacao;
    }

    public LocalDateTime getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(LocalDateTime dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public LocalDateTime getDataSaida() {
        return dataSaida;
    }

    public void setDataSaida(LocalDateTime dataSaida) {
        this.dataSaida = dataSaida;
    }

    public StatusInternacao getStatus() {
        return status;
    }

    public void setStatus(StatusInternacao status) {
        this.status = status;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public List<EvolucaoInternacao> getEvolucoesInternacao() {
        return evolucoesInternacao;
    }

    public void setEvolucoesInternacao(List<EvolucaoInternacao> evolucoesInternacao) {
        this.evolucoesInternacao = evolucoesInternacao;
    }

    public Atendimento getAtendimento() {
        return atendimento;
    }

    public void setAtendimento(Atendimento atendimento) {
        this.atendimento = atendimento;
    }
}