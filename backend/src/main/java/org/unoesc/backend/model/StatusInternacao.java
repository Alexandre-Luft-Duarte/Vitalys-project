package org.unoesc.backend.model;

/**
 * Enumeração que define o estado atual de uma internação.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
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