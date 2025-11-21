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

@Entity
@Table(name = "anotacao_medica")
public class AnotacaoMedica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnotacaoMedica;

    @Column(nullable = false)
    private String textoAnotacao;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "id_atendimento", nullable = false)
    @JsonIgnore
    private Atendimento atendimento;

    @ManyToOne
    @JoinColumn(name = "id_departamento", nullable = false)
    private Departamento departamento;

    public AnotacaoMedica(Long idAnotacaoMedica, String textoAnotacao, LocalDateTime dataHora, Atendimento atendimento) {
        this.idAnotacaoMedica = idAnotacaoMedica;
        this.textoAnotacao = textoAnotacao;
        this.dataHora = dataHora;
        this.atendimento = atendimento;
    }

    public AnotacaoMedica() {}

    public Long getIdAnotacaoMedica() {
        return idAnotacaoMedica;
    }

    public void setIdAnotacaoMedica(Long idAnotacaoMedica) {
        this.idAnotacaoMedica = idAnotacaoMedica;
    }

    public String getTextoAnotacao() {
        return textoAnotacao;
    }

    public void setTextoAnotacao(String textoAnotacao) {
        this.textoAnotacao = textoAnotacao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Atendimento getAtendimento() {
        return atendimento;
    }

    public void setAtendimento(Atendimento atendimento) {
        this.atendimento = atendimento;
    }
}
