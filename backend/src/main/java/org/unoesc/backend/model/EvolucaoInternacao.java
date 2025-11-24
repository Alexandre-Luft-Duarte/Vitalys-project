package org.unoesc.backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Representa uma anotação de evolução clínica registrada durante uma internação.
 * <p>
 * Utilizada por profissionais de saúde para documentar a progressão do estado
 * do paciente, intercorrências e condutas diárias.
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@Entity
@Table(name = "evolucao_internacao")
public class EvolucaoInternacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvolucaoInternacao;

    /**
     * Texto descritivo da evolução clínica.
     */
    @Column(nullable = false)
    private String textoEvolucao;

    /**
     * Data e hora do registro da evolução.
     */
    @Column(nullable = false)
    private LocalDateTime dataHora;

    /**
     * Internação à qual esta evolução pertence.
     * Marcado com @JsonIgnore para evitar loop infinito na serialização JSON.
     */
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_internacao", nullable = false)
    private Internacao internacao;

    /**
     * Profissional que realizou o registro da evolução.
     */
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