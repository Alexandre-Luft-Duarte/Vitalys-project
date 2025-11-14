package org.unoesc.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "internacao")
public class Internacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInternacao;

    @Column(nullable = false)
    private LocalDateTime dataEntrada;

    @Column(nullable = true)
    private LocalDateTime dataSaida;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusInternacao status;

    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "id_profissional", nullable = false)
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    @OneToMany(mappedBy = "internacao", cascade = CascadeType.ALL)
    private List<EvolucaoInternacao> evolucoesInternacao = new ArrayList<>();

    public Internacao(Long idInternacao, LocalDateTime dataEntrada, LocalDateTime dataSaida, StatusInternacao status, Paciente paciente, Profissional profissional, List<EvolucaoInternacao> evolucoesInternacao, Departamento departamento) {
        this.idInternacao = idInternacao;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.status = status;
        this.paciente = paciente;
        this.profissional = profissional;
        this.evolucoesInternacao = evolucoesInternacao;
        this.departamento = departamento;
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
}
