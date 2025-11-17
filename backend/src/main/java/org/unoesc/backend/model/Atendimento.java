package org.unoesc.backend.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "atendimento")
public class Atendimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAtendimento;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusAtendimento status;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Profissional profissional;

    @ManyToOne
    private Recepcionista recepcionista;

    @ManyToOne
    private Departamento departamento;

    @OneToMany(mappedBy = "atendimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnotacaoMedica> anotacoesMedicas = new ArrayList<>();

    public Atendimento(Long idAtendimento, LocalDateTime dataHora, StatusAtendimento status, Paciente paciente, Profissional profissional, Departamento departamento, List<AnotacaoMedica> anotacoesMedicas) {
        this.idAtendimento = idAtendimento;
        this.dataHora = dataHora;
        this.status = status;
        this.paciente = paciente;
        this.profissional = profissional;
        this.departamento = departamento;
        this.anotacoesMedicas = anotacoesMedicas;
    }

    public Atendimento() {}

    public Long getIdAtendimento() {
        return idAtendimento;
    }

    public void setIdAtendimento(Long idAtendimento) {
        this.idAtendimento = idAtendimento;
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
}
