package org.unoesc.backend.model;

public enum StatusAtendimento {
    AGUARDANDO("Aguardando"),
    EM_ATENDIMENTO("Em Atendimento"),
    INTERNADO("Internado"),
    FINALIZADO("Finalizado");

    public final String status;
    private StatusAtendimento(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
