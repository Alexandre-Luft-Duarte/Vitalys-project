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
import jakarta.persistence.Table;

/**
 * Entidade que representa um atendimento clínico ou administrativo realizado a um paciente.
 * <p>
 * Centraliza as informações do fluxo de atendimento, vinculando o paciente a profissionais
 * (médico ou recepcionista), departamento e registrando anotações médicas.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "atendimento")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAtendimento;

    /**
     * Data e hora exata da criação do atendimento.
     */
    @Column(nullable = false)
    private LocalDateTime dataHora;

    /**
     * Estado atual do atendimento no fluxo de trabalho.
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusAtendimento status;

    /**
     * Profissional (Médico/Enfermeiro) responsável pelo atendimento clínico.
     * Pode ser nulo no momento da triagem/recepção.
     */
    @ManyToOne
    @JoinColumn(nullable = true)
    private Profissional profissional;

    /**
     * Paciente que está sendo atendido.
     */
    @ManyToOne
    private Paciente paciente;

    /**
     * Recepcionista que abriu o atendimento (triagem inicial).
     */
    @ManyToOne
    private Recepcionista recepcionista;

    /**
     * Departamento onde o atendimento está ocorrendo (ex: Emergência, Clínica Geral).
     */
    @ManyToOne
    private Departamento departamento;

    /**
     * Lista de anotações médicas (evoluções, anamneses) vinculadas a este atendimento.
     */
    @OneToMany(mappedBy = "atendimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnotacaoMedica> anotacoesMedicas = new ArrayList<>();

    /**
     * Descrição breve do motivo ou queixa principal que gerou o atendimento.
     */
    @Column(nullable = true)
    private String motivo;

    public Atendimento(Long idAtendimento, LocalDateTime dataHora, StatusAtendimento status, Paciente paciente, Profissional profissional, Departamento departamento, List<AnotacaoMedica> anotacoesMedicas, String motivo) {
        this.idAtendimento = idAtendimento;
        this.dataHora = dataHora;
        this.status = status;
        this.paciente = paciente;
        this.profissional = profissional;
        this.departamento = departamento;
        this.anotacoesMedicas = anotacoesMedicas;
        this.motivo = motivo;
    }

    public Atendimento() {}

    public Long getIdAtendimento() {
        return idAtendimento;
    }

    public void setIdAtendimento(Long idAtendimento) {
        this.idAtendimento = idAtendimento;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusAtendimento getStatus() {
        return status;
    }

    public void setStatus(StatusAtendimento status) {
        this.status = status;
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

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public List<AnotacaoMedica> getAnotacoesMedicas() {
        return anotacoesMedicas;
    }

    public void setAnotacoesMedicas(List<AnotacaoMedica> anotacoesMedicas) {
        this.anotacoesMedicas = anotacoesMedicas;
    }

    public Recepcionista getRecepcionista() {
        return recepcionista;
    }

    public void setRecepcionista(Recepcionista recepcionista) {
        this.recepcionista = recepcionista;
    }
}