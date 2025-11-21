package org.unoesc.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evolucao_internacao")
public class EvolucaoInternacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvolucaoInternacao;

    @Column(nullable = false)
    private String textoEvolucao;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_internacao", nullable = false)
    private Internacao internacao;

    @ManyToOne
    @JoinColumn(name = "id_profissional", nullable = false)
    private Profissional profissional;

    public EvolucaoInternacao(Long idEvolucaoInternacao, String textoEvolucao, LocalDateTime dataHora, Internacao internacao, Profissional profissional) {
        this.idEvolucaoInternacao = idEvolucaoInternacao;
        this.textoEvolucao = textoEvolucao;
        this.dataHora = dataHora;
        this.internacao = internacao;
        this.profissional = profissional;
    }

    public EvolucaoInternacao() {}

    public Long getIdEvolucaoInternacao() {
        return idEvolucaoInternacao;
    }

    public void setIdEvolucaoInternacao(Long idEvolucaoInternacao) {
        this.idEvolucaoInternacao = idEvolucaoInternacao;
    }

    public String getTextoEvolucao() {
        return textoEvolucao;
    }

    public void setTextoEvolucao(String textoEvolucao) {
        this.textoEvolucao = textoEvolucao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public Internacao getInternacao() {
        return internacao;
    }

    public void setInternacao(Internacao internacao) {
        this.internacao = internacao;
    }
}
