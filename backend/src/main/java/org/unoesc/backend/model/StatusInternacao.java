package org.unoesc.backend.model;

public enum StatusInternacao {
    ATIVA("Ativa"),
    FINALIZADA("Finalizada");

    public final String status;
    private StatusInternacao(String status) {
        this.status = status;
    }
    public String getStatus() {
        return status;
    }
}
