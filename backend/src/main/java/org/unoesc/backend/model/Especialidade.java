package org.unoesc.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "especialidade")
public class Especialidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEspecialidade;

    @Column(nullable = false)
    private String especialidade;

    public Especialidade(Long idEspecialidade, String especialidade) {
        this.idEspecialidade = idEspecialidade;
        this.especialidade = especialidade;
    }

    public Especialidade() {}

    public Long getIdEspecialidade() {
        return idEspecialidade;
    }

    public void setIdEspecialidade(Long idEspecialidade) {
        this.idEspecialidade = idEspecialidade;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
